import fs from "mz/fs";
import { FILE_LOADED, FILE_WRITTEN, FILE_DELETED } from "wheelhouse-core";
import { basename } from "path";
import { safeLoad as parseYaml, safeDump as stringifyYaml } from "js-yaml";
import { dirname } from "path";
import { createHash } from "crypto";
import tar from "tar";

const TARBALL_EXTENSIONS = [".gz", ".tgz"];

const checkBinary = filePath => {
  return TARBALL_EXTENSIONS.some(ext => filePath.endsWith(ext));
};

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
  const hash = await getHash(filePath, content);
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
 * So tarballs can be subtly different for hashing purposes. But when we're trying to lock package
 * versions, we want the same one to be the same. So this function gets the proper hash of a
 * tarball by deterministically comparing its contents.
 * @param {String} filePath
 */
const getHash = async (filePath, content) => {
  const hasher = createHash("sha256");
  if (!checkBinary(filePath)) {
    hasher.update(content);
    return hasher.digest("hex");
  }
  let files = {};
  await tar.t({
    file: filePath,
    onentry: entry => {
      files[entry.path] = [];
      entry.on("data", chunk => {
        files[entry.path].push(chunk);
      });
    }
  });
  // Sort the filenames every time so it's deterministic
  const sortedFiles = Object.keys(files).sort();
  for (const path of sortedFiles) {
    hasher.update(path);
    files[path].forEach(chunk => {
      hasher.update(chunk);
    });
  }
  return hasher.digest("hex");
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

  await fs.writeFile(filePath, content);
  dispatch(action);
  return action;
};

/**
 * Revert a file to its original state the first time we saw it. Useful for package.json and
 * Chart.yaml tweaks.
 */
export const fileRevert = filePath => async (dispatch, getState) => {
  const file = getState().file[filePath];
  if (!file || !file.originalContent) {
    throw new Error(`can't revert ${filePath}, we don't have that file`);
  }
  await fs.writeFile(filePath, file.originalContent);
};

/**
 * Write a file to the system. This function is "smart" about properly writing JSON and YAML files
 * -- otherwise you better be passing me a string or Buffer.
 */
export const fileDelete = filePath => async (dispatch, getState) => {
  // Streaming API could optimize this a bit. Quick win here if wheelhouse is slow.
  await fs.unlink(filePath);
  dispatch({
    type: FILE_DELETED,
    path: filePath
  });
};
