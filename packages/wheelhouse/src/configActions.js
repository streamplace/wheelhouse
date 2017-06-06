import findUp from "find-up";
import debug from "debug";
import path from "path";
import { fileLoad } from "./fileActions";
import {
  CONFIG_LOADED,
  CONFIG_ROOT_FOUND,
  CONFIG_PACKAGE_FOUND
} from "wheelhouse-core";
import Glob from "@iameli/glob-fs";

const glob = Glob({ gitignore: true });
const CONFIG_NAME = "wheelhouse.yaml";
const log = debug("wheelhouse:config-actions");

/**
 * Locate the salient config file and use it to run.
 */
export const configInit = () => async (dispatch, getState) => {
  log(`Searching for ${CONFIG_NAME}...`);

  const configPath = await findUp(CONFIG_NAME);
  if (!configPath) {
    throw new Error(
      `Unable to locate ${CONFIG_NAME} in parent directories of ${process.cwd()}`
    );
  }
  const rootPath = path.dirname(configPath);
  await dispatch(configRootFound(rootPath));

  const { data } = await dispatch(fileLoad(configPath));
  await dispatch(configLoaded(data));

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
    .filter(pkg => pkg.split("/").pop()[0] !== ".")
    .forEach(pkg => {
      dispatch({
        type: CONFIG_PACKAGE_FOUND,
        dir: pkg
      });
    });
};

export const configRootFound = rootDir => ({
  type: CONFIG_ROOT_FOUND,
  rootDir
});

/**
 * Fires when the config file is loaded.
 */
export const configLoaded = (configData, rootPackageJson) => ({
  type: CONFIG_LOADED,
  configData
});
