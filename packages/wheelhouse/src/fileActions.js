import fs from "mz/fs";
import { FILE_LOADED, FILE_WRITTEN } from "wheelhouse-core";
import { basename } from "path";
import { safeLoad as parseYaml, safeDump as stringifyYaml } from "js-yaml";
import { dirname } from "path";
import { createHash } from "crypto";

const BINARY_EXTENSIONS = [".gz", ".tgz"];

const checkBinary = filePath =>
  BINARY_EXTENSIONS.some(ext => filePath.endsWith(ext));

/**
 * Read a file from the system. Every single time that happens, it should go through this method.
 */
export const fileLoad = filePath => async (dispatch, getState) => {
  // Streaming API could optimize this a bit. Quick win here if wheelhouse is slow.
  let content;
  const isBinary = checkBinary(filePath);
  if (isBinary) {
    content = await fs.readFile(filePath);
  } else {
    content = await fs.readFile(filePath, "utf8");
  }
  const hasher = createHash("sha256");
  hasher.update(content);
  const hash = hasher.digest("hex");
  const action = {
    type: FILE_LOADED,
    path: filePath,
    content: isBinary ? null : content,
    name: basename(filePath),
    data: null,
    hash: hash
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

/**
 * Write a file to the system. This function is "smart" about properly writing JSON and YAML files
 * -- otherwise you better be passing me a string or Buffer.
 */
export const fileWrite = (filePath, content) => async (dispatch, getState) => {
  // Streaming API could optimize this a bit. Quick win here if wheelhouse is slow.
  const action = {
    type: FILE_WRITTEN,
    path: filePath,
    name: basename(filePath)
  };
  if (typeof content !== "string" || !(content instanceof Buffer)) {
    const data = content;
    if (filePath.endsWith(".json")) {
      content = JSON.stringify(content, null, 2);
    } else if (filePath.endsWith(".yml") || filePath.endsWith(".yaml")) {
      content = stringifyYaml(content);
    } else {
      throw new Error(
        "fileWrite does not know how to handle the data you passed it"
      );
    }
    action.data = data;
  }
  const isBinary = checkBinary(filePath);
  action.content = isBinary ? null : content;
  const hasher = createHash("sha256");
  hasher.update(content);
  const hash = hasher.digest("hex");
  action.hash = hash;

  await fs.writeFile(filePath, content);
  dispatch(action);
  return action;
};
