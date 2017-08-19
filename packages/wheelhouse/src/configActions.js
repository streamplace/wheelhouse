import findUp from "find-up";
import debug from "debug";
import path from "path";
import { fileLoad } from "./fileActions";
import {
  CONFIG_LOADED,
  CONFIG_ROOT_FOUND,
  CONFIG_PACKAGE_FOUND,
  CONFIG_VERSION
} from "wheelhouse-core";
import Glob from "@iameli/glob-fs";
import { run } from "./util/run";
import dot from "dot-object";
import fs from "fs-extra";
import { safeLoad as yamlParse } from "js-yaml";
import semver from "semver";

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

  // Data gets extended from our default YAML
  const defaultContent = await fs.readFile(
    path.resolve(__dirname, "defaultConfig.yaml")
  );
  const defaultData = yamlParse(defaultContent);
  const { data } = await dispatch(fileLoad(configPath));
  // dot-object to do a deep merge of our objects
  const defaultFlat = dot.dot(defaultData);
  const dataFlat = dot.dot(data);
  const combinedFlat = {
    ...defaultFlat,
    ...dataFlat
  };
  // Allow any of these variables to be overriden by environment variables...
  Object.keys(combinedFlat).forEach(key => {
    // rewrites "s3.accessKeyId" to "WH_S3_ACCESS_KEY_ID"
    const envKey =
      "WH_" + key.replace(/([A-Z])/g, "_$1").toUpperCase().replace(/\./g, "_");
    if (process.env[envKey]) {
      combinedFlat[key] = process.env[envKey];
    }
  });
  const combinedData = dot.object(combinedFlat);
  const rootPackage = await dispatch(
    fileLoad(path.resolve(rootPath, "package.json"))
  );
  await dispatch(configLoaded(combinedData));

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

  const stdout = await run("git", ["rev-parse", "HEAD"]);
  const hash = stdout.slice(0, 8);
  const { major, minor, patch } = semver.parse(rootPackage.data.version);
  // For now our assumed version is one up from our current version plus hash
  await dispatch({
    type: CONFIG_VERSION,
    version: `${major}.${minor}.${patch + 1}-${hash}`
  });

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
