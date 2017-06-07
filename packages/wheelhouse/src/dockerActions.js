import { resolve } from "path";
import { fileLoad } from "./fileActions";
import fs from "fs-extra";

export const dockerInit = () => async (dispatch, getState) => {
  const { packageDirs } = getState().config;
  await Promise.all(packageDirs.map(p => dispatch(dockerLoad(p))));
};

export const dockerLoad = pkgPath => async (dispatch, getState) => {
  const { rootDir } = getState().config;
  const dockerPath = resolve(rootDir, pkgPath, "Dockerfile");
  if (await fs.pathExists(dockerPath)) {
    await dispatch(fileLoad(dockerPath));
  }
};
