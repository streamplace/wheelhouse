import { resolve } from "path";
import { fileLoad } from "./fileActions";
import fs from "fs-extra";
import { pkgForEach } from "./util/graph";
import { procRun } from "./procActions";
import debug from "debug";

const log = debug("wheelhouse:dockerActions");

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

export const dockerBuild = () => async (dispatch, getState) => {
  const { packages, config } = getState();
  await pkgForEach(packages, async pkg => {
    log(`searching for ${resolve(pkg.path, "Dockerfile")}`);
    if (await fs.pathExists(resolve(pkg.path, "Dockerfile"))) {
      const tag = `${config.docker.prefix}/${pkg.name}`;
      await dispatch(
        procRun("docker", ["build", "-t", tag, "."], {
          cwd: pkg.path
        })
      );
    }
  });
};
