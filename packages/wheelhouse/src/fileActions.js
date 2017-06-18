import fs from "mz/fs";
import { FILE_LOADED } from "wheelhouse-core";
import { basename } from "path";
import { safeLoad as parseYaml } from "js-yaml";
import { dirname } from "path";

/**
 * Read a file from the system. Every single time that happens, it should go through this method.
 */
export const fileLoad = filePath => async (dispatch, getState) => {
  const content = await fs.readFile(filePath, "utf8");
  const action = {
    type: FILE_LOADED,
    path: filePath,
    content: content,
    name: basename(filePath),
    data: null
  };
  const { packages } = getState();
  const dir = dirname(filePath);
  for (const pkgName of Object.keys(packages)) {
    if (dir.includes(packages[pkgName].path)) {
      action.package = pkgName;
    }
  }
  if (filePath.endsWith(".json")) {
    action.data = JSON.parse(content);
  } else if (filePath.endsWith(".yml") || filePath.endsWith(".yaml")) {
    action.data = parseYaml(content);
  }
  dispatch(action);
  return action;
};
