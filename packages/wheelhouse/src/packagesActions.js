import fs from "mz/fs";
import debug from "debug";
import { resolve } from "path";
import {
  PACKAGES_LOADED,
  PACKAGES_START,
  PACKAGES_STOP
} from "wheelhouse-core";
import { spawn } from "mz/child_process";
import split from "split";
import { developmentLog } from "./developmentActions";

const log = debug("wheelhouse:packagesActions");

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

export const packagesLoaded = ({ packageJson, path }) => {
  return { type: PACKAGES_LOADED, packageJson, path };
};

const procs = {};

export const packagesRun = (pkgName, status) => async (dispatch, getState) => {
  let pkg = getState().packages[pkgName];
  if (!pkg) {
    throw new Error(`Unknown package: ${pkgName}`);
  }

  if (status === false) {
    procs[pkgName].kill("SIGKILL");
    dispatch({
      type: PACKAGES_STOP,
      pkgName
    });
    return;
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

  const proc = spawn("bash", ["-c", devScript], {
    cwd: pkg.path
  });

  procs[pkgName] = proc;

  proc.stdout.pipe(split()).on("data", text => {
    dispatch(developmentLog(pkgName, text));
  });

  proc.stderr.pipe(split()).on("data", text => {
    dispatch(developmentLog(pkgName, text));
  });

  proc.on("close", code => {
    dispatch(developmentLog(pkgName, `process exited with code ${code}`));
  });

  dispatch({
    type: PACKAGES_START,
    pkgName
  });
};
