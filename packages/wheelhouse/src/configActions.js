import findUp from "find-up";
import debug from "debug";
import { safeLoad as parseYaml } from "js-yaml";
import path from "path";
import fs from "mz/fs";
import { CONFIG_LOADED, CONFIG_ROOT_FOUND } from "wheelhouse-core";
import { packagesLoad } from "./packagesActions";
import { helmLoad } from "./helmActions";
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
  const rootPath = path.dirname(configPath);
  await dispatch(configRootFound(rootPath));

  const yamlStr = await fs.readFile(configPath, "utf8");
  const configData = parseYaml(yamlStr);
  await dispatch(configLoaded(configData));
  let packages = [];
  for (const pkgName of configData.packages) {
    const resolved = path.resolve(rootPath, pkgName);
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
  await Promise.all(
    packages.map(async p => {
      await dispatch(packagesLoad(p));
      await dispatch(helmLoad(p));
    })
  );
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
