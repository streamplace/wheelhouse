import Glob from "glob-fs";
import path from "path";

const glob = Glob({ gitignore: true });

export const globDirs = dirs => async (dispatch, getState) => {
  const rootDir = getState().config.rootDir;
  let packages = [];
  for (const candidatePath of dirs) {
    const resolved = path.resolve(rootDir, candidatePath);
    if (candidatePath.indexOf("*") === -1) {
      packages.push([resolved]);
      continue;
    }
    packages.push(
      await glob.readdirPromise(path.relative(process.cwd(), resolved))
    );
  }
  return packages
    .reduce((arr1, arr2) => arr1.concat(arr2), [])
    .map(pkg => {
      return path.resolve(pkg);
    })
    .filter(pkg => pkg.split("/").pop()[0] !== ".");
};
