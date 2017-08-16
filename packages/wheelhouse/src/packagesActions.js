import fs from "fs-extra";
import debug from "debug";
import { resolve } from "path";
import {
  PACKAGES_LOADED,
  PACKAGES_START,
  PACKAGES_STOP,
  PACKAGES_UPLOADED,
  PACKAGES_DEPENDENCY_NAMES
} from "wheelhouse-core";
import { spawn } from "child_process";
import split from "split";
import { developmentLog } from "./developmentActions";
import { run } from "./util/run";
import { pkgForEach } from "./util/graph";
import semver from "semver";
import { fileLoad, fileWrite, fileDelete } from "./fileActions";
import { s3PutFile } from "./s3Actions";
import { procRun } from "./procActions";
// wait at least this long before auto-rebooting an app, prevent thrash
const SHOULD_RETRY = 1000;
const log = debug("wheelhouse:packagesActions");

export const packagesInit = () => async (dispatch, getState) => {
  const { packageDirs } = getState().config;
  await Promise.all(packageDirs.map(p => dispatch(packagesLoad(p))));
};

export const packagesStart = startApps => async (dispatch, getState) => {
  const { packages, file, config } = getState();
  const rootJson = file[resolve(config.rootDir, "package.json")];
  if (rootJson && rootJson.data.scripts && rootJson.data.scripts.prestart) {
    await run("npm", ["run", "prestart"], {
      stdout: line => dispatch(developmentLog("wheelhouse", line)),
      stderr: line => dispatch(developmentLog("wheelhouse", line)),
      cwd: config.rootDir
    });
  }
  Object.keys(packages).forEach(pkgName => {
    if (
      packages[pkgName].packageJson.wheelhouse.autostart ||
      startApps.includes(pkgName)
    ) {
      dispatch(packagesRun(pkgName, true));
    }
  });
};

export const packagesLoad = pkgPath => async (dispatch, getState) => {
  log(`Loading ${pkgPath}`);
  const { rootDir } = getState().config;
  const pkgJsonPath = resolve(rootDir, pkgPath, "package.json");
  const { data, content } = await dispatch(fileLoad(pkgJsonPath));
  dispatch(
    packagesLoaded({
      content: content,
      packageJson: data,
      path: resolve(pkgPath)
    })
  );
};

// Idempotent function to block once on checking npm version
const MIN_NPM_VER = "5.0.0";
let checkNpmProm;
let checkNpmOnce = async () => {
  if (!checkNpmProm) {
    checkNpmProm = run("npm", ["--version"]);
    const ver = await checkNpmProm;
    if (semver.lt(ver, MIN_NPM_VER)) {
      throw new Error(
        `wheelhouse requires npm >= ${MIN_NPM_VER}, you have ${ver},
        please run npm install -g npm`
      );
    }
  } else {
    await checkNpmProm;
  }
};

export const packagesInstall = () => async (dispatch, getState) => {
  await checkNpmOnce();
  const { packages } = getState();
  await pkgForEach(packages, async pkg => {
    await dispatch(
      procRun("npm", ["install"], {
        cwd: pkg.path
      })
    );
  });
};

export const packagesBuild = () => async (dispatch, getState) => {
  await checkNpmOnce();
  const { packages } = getState();
  await pkgForEach(packages, async pkg => {
    const newPackageJson = {
      ...pkg.packageJson,
      version: "0.0.0-wheelhouse-build" // Set all the versions to the same so everything caches,
    };
    const { packages } = getState();
    pkg.localDependencies.forEach(depName => {
      const depUrl = packages[depName].buildUrl;
      if (!depUrl) {
        throw new Error(`${depName} doesn't appear to be uploaded`);
      }
      PACKAGES_DEPENDENCY_NAMES.filter(
        field => pkg.packageJson[field]
      ).forEach(field => {
        // This is dependencies, devDependencies, optionalDependencies
        if (Object.keys(pkg.packageJson[field]).includes(depName)) {
          newPackageJson[field] = {
            ...pkg.packageJson[field],
            [depName]: depUrl
          };
        }
      });
    });
    await dispatch(
      fileWrite(resolve(pkg.path, "package.json"), newPackageJson)
    );
    const stdout = await dispatch(
      procRun("npm", ["pack"], {
        cwd: pkg.path
      })
    );
    const tarballPath = stdout.split("\n").pop();
    const file = await dispatch(fileLoad(resolve(pkg.path, tarballPath)));
    const pkgPath = `packages/${pkg.name}-${file.hash.slice(0, 10)}.tgz`;
    const { url } = await dispatch(
      s3PutFile({
        filePath: file.path,
        objectName: pkgPath
      })
    );
    dispatch(developmentLog(pkg.name, `uploaded ${url}`));
    await dispatch(fileDelete(file.path));
    dispatch({
      type: PACKAGES_UPLOADED,
      name: pkg.name,
      url: url
    });
  });
};

export const packagesCleanup = () => async (dispatch, getState) => {
  await checkNpmOnce();
  const { packages } = getState();
  await pkgForEach(packages, async pkg => {
    await fs.writeFile(resolve(pkg.path, "package.json"), pkg.originalContent);
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

export const packagesLoaded = ({ packageJson, path, content }) => {
  return { type: PACKAGES_LOADED, packageJson, path, content };
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
  // Ugh at this, but it appears to be necessary to give
  // the process.kill a minute to go out.
  setTimeout(function() {
    process.exit(0);
  }, 100);
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
