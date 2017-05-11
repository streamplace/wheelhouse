import findUp from "find-up";
import debug from "debug";
import { safeLoad as parseYaml } from "js-yaml";
import path from "path";
import fs from "mz/fs";
import { CONFIG_LOADED, CONFIG_ROOT_FOUND } from "wheelhouse-core";
import { packagesLoad } from "./packagesActions";
import Glob from "glob-fs";

const glob = Glob({ gitignore: true });

const CONFIG_NAME = "wheelhouse.yaml";

const log = debug("wheelhouse:config-actions");

/**
 * Locate the salient config file and use it to run.
 */
export const configLoad = () => async dispatch => {
  log(`Searching for ${CONFIG_NAME}...`);

  const configPath = await findUp(CONFIG_NAME);
  if (!configPath) {
    throw new Error(
      `Unable to locate ${CONFIG_NAME} in parent directories of ${process.cwd()}`
    );
  }
  await dispatch(configRootFound(path.dirname(configPath)));

  const yamlStr = await fs.readFile(configPath, "utf8");
  const configData = parseYaml(yamlStr);
  await dispatch(configLoaded(configData));
  let packages = await Promise.all(
    configData.packages.map(async pkgName => {
      // If the string has a *, glob it, otherwise treat it as literal
      if (pkgName.indexOf("*") === -1) {
        return [pkgName];
      }
      return await glob.readdirPromise(pkgName);
    })
  );
  packages = packages
    .reduce((arr1, arr2) => arr1.concat(arr2), [])
    .map(pkg => path.resolve(pkg))
    .filter(pkg => pkg.split("/").pop()[0] !== ".");
  await Promise.all(packages.map(p => dispatch(packagesLoad(p))));
};

export const configRootFound = rootDir => ({
  type: CONFIG_ROOT_FOUND,
  rootDir
});

/**
 * Fires when the config file is loaded.
 */
export const configLoaded = configData => ({ type: CONFIG_LOADED, configData });
