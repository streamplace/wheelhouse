import fs from "mz/fs";
import { FILE_LOADED } from "wheelhouse-core";
import { basename } from "path";
import { safeLoad as parseYaml } from "js-yaml";

export const fileLoad = filePath => async dispatch => {
  const content = await fs.readFile(filePath, "utf8");
  const action = {
    type: FILE_LOADED,
    path: filePath,
    content: content,
    name: basename(filePath),
    data: null
  };
  if (filePath.endsWith(".json")) {
    action.data = JSON.parse(content);
  } else if (filePath.endsWith(".yml") || filePath.endsWith(".yaml")) {
    action.data = parseYaml(content);
  }
  dispatch(action);
  return action;
};
