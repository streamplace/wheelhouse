import fs from "fs-extra";
import debug from "debug";
import { resolve } from "path";
import {
  PACKAGES_LOADED,
  PACKAGES_START,
  PACKAGES_STOP
} from "wheelhouse-core";
import { spawn } from "child_process";
import split from "split";
import { developmentLog } from "./developmentActions";
import { run } from "./util/run";
import { pkgForEach } from "./util/graph";
import path from "path";
import Glob from "glob-fs";

const glob = Glob({ gitignore: true });
const SHOULD_RETRY = 1000; // wait at least this long before auto-rebooting an app, prevent thrash
const log = debug("wheelhouse:packagesActions");

export const packagesInit = () => async (dispatch, getState) => {
  const { config } = getState();
  let packages = [];
  for (const pkgName of config.packages) {
    const resolved = path.resolve(config.rootDir, pkgName);
    if (pkgName.indexOf("*") === -1) {
      packages.push([resolved]);
      continue;
    }
    packages.push(
      await glob.readdirPromise(path.relative(process.cwd(), resolved))
    );
  }
  packages = packages
    .reduce((arr1, arr2) => arr1.concat(arr2), [])
    .map(pkg => {
      return path.resolve(pkg);
    })
    .filter(pkg => pkg.split("/").pop()[0] !== ".");
  await Promise.all(packages.map(p => dispatch(packagesLoad(p))));
};

export const packagesStart = () => async (dispatch, getState) => {
  const { packages } = getState();
  Object.keys(packages).forEach(pkgName => {
    if (packages[pkgName].packageJson.wheelhouse.autostart) {
      dispatch(packagesRun(pkgName, true));
    }
  });
};

export const packagesLoad = pkgPath => async (dispatch, getState) => {
  log(`Loading ${pkgPath}`);
  const { rootDir } = getState().config;
  const pkgJsonPath = resolve(rootDir, pkgPath, "package.json");
  const pkgJson = await fs.readFile(pkgJsonPath, "utf8");
  const pkg = JSON.parse(pkgJson);
  dispatch(
    packagesLoaded({
      packageJson: pkg,
      path: resolve(pkgPath)
    })
  );
};

export const packagesInstall = () => async (dispatch, getState) => {
  const { packages } = getState();
  await pkgForEach(packages, async pkg => {
    await run("npm", ["install"], {
      stdout: line => dispatch(developmentLog(pkg.name, line)),
      stderr: line => dispatch(developmentLog(pkg.name, line)),
      cwd: pkg.path
    });
  });
};

export const packagesLink = () => async (dispatch, getState) => {
  const { packages } = getState();
  const links = [];
  Object.keys(packages).forEach(pkgName => {
    const pkg = packages[pkgName];
    pkg.allDependencies.forEach(depName => {
      if (packages[depName]) {
        links.push([pkg, packages[depName]]);
      }
    });
  });

  const proms = links.map(async ([pkg, dep]) => {
    dispatch(
      developmentLog(
        "wheelhouse",
        `linking ${dep.packageJson.name} for ${pkg.packageJson.name}`
      )
    );
    const linkPath = resolve(pkg.path, "node_modules", dep.packageJson.name);
    try {
      await fs.remove(linkPath);
    } catch (e) {
      // No problem, we're idempotent, we probably just removed it already.
    }
    await fs.symlink(dep.path, linkPath);
  });

  await Promise.all(proms);
};

export const packagesLoaded = ({ packageJson, path }) => {
  return { type: PACKAGES_LOADED, packageJson, path };
};

const procs = {};

export const packagesRun = (pkgName, status) => async (dispatch, getState) => {
  const state = getState();
  let pkg = state.packages[pkgName];
  const env = { ...process.env };
  for (const envName of Object.keys(state.development.env)) {
    env[envName] = state.development.env[envName].currentValue;
  }

  if (!pkg) {
    const message = `Unknown package: ${pkgName}`;
    throw new Error(message);
  }

  if (status === false) {
    dispatch(developmentLog(pkgName, "stopping"));
    // Negative pid kills the proc group
    try {
      process.kill(-procs[pkgName].pid);
    } catch (e) {
      // It's already gone. That's great!
    }
    dispatch({
      type: PACKAGES_STOP,
      pkgName
    });
    delete procs[pkgName];
    return;
  } else {
    dispatch(developmentLog(pkgName, "starting"));
  }
  // Refresh package.json, in case they changed the dev script or something
  await dispatch(packagesLoad(pkg.path));
  pkg = getState().packages[pkgName];
  const devScript = pkg.packageJson.scripts.dev;
  if (!devScript) {
    throw new Error(
      `Package ${pkgName} doesn't have a dev script, can't start`
    );
  }

  const startTime = Date.now();

  const proc = spawn("bash", ["-c", devScript], {
    cwd: pkg.path,
    env,
    detached: true
  });

  procs[pkgName] = proc;

  proc.stdout.pipe(split()).on("data", text => {
    dispatch(developmentLog(pkgName, text));
  });

  proc.stderr.pipe(split()).on("data", text => {
    dispatch(developmentLog(pkgName, text));
  });

  proc.on("close", (code, signal) => {
    dispatch(
      developmentLog(pkgName, `process closed code=${code} signal=${signal}`)
    );
    delete procs[pkgName];
  });

  proc.on("exit", async (code, signal) => {
    if (!procs[pkgName]) {
      // Expected exit.
      return;
    }
    const uptime = Date.now() - startTime;
    dispatch(
      developmentLog(pkgName, `process exited code=${code} signal=${signal}`)
    );
    // Clean up any remaining subprocesses
    // process.kill(proc.pid);
    try {
      process.kill(-proc.pid, "SIGKILL");
    } catch (e) {
      if (e.code !== "ESRCH") {
        /* eslint-disable no-console */
        console.error(e);
      }
    }
    if (code !== 0) {
      dispatch(developmentLog(pkgName, "abnormal exit detected"));
      if (uptime < SHOULD_RETRY) {
        dispatch(
          developmentLog(
            pkgName,
            `but we were only up for ${uptime}ms, so we're not going to retry.`
          )
        );
      } else {
        dispatch(developmentLog(pkgName, "retrying!"));
        dispatch(packagesRun(pkgName));
      }
      return;
    }
    dispatch({
      type: PACKAGES_STOP,
      pkgName
    });
  });

  proc.on("disconnect", () => {
    dispatch(
      developmentLog(
        pkgName,
        "proc disconnect? this shouldn't happen. tell eli."
      )
    );
  });

  proc.on("error", err => {
    dispatch(developmentLog(pkgName, `process error: ${err}`));
  });

  dispatch({
    type: PACKAGES_START,
    pkgName
  });
};

const cleanup = () => {
  Object.keys(procs).forEach(proc => {
    try {
      process.kill(-procs[proc].pid, "SIGKILL");
    } catch (e) {
      // It's already gone. That's great!
    }
  });
  // Ugh at this, but it appears to be necessary to give the process.kill a minute to go out.
  setTimeout(function() {
    process.exit(0);
  }, 100);
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
