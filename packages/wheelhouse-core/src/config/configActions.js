
import findUp from "find-up";
import debug from "debug";
import { safeLoad as parseYaml } from "js-yaml";
import fs from "mz/fs";
import { CONFIG_LOADED } from "./configConstants";

const CONFIG_NAME = "wheelhouse.yaml";

const log = debug("wheelhouse:config-actions");

/**
 * Locate the salient config file and use it to run.
 */
export const configLoad = () => async dispatch => {
  log(`Searching for ${CONFIG_NAME}...`);

  const configPath = await findUp(CONFIG_NAME);
  if (!configPath) {
    throw new Error(`Unable to locate ${CONFIG_NAME} in parent directories of ${process.cwd()}`);
  }

  const yamlStr = await fs.readFile(configPath, "utf8");
  const configData = parseYaml(yamlStr);
  dispatch(configLoaded(configData));
};

/**
 * Fires when the config file is loaded.
 */
export const configLoaded = (configData) => ({ type: CONFIG_LOADED, configData });
