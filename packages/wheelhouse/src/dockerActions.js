import { resolve } from "path";
import { fileLoad } from "./fileActions";
import fs from "fs-extra";
import { pkgForEach } from "./util/graph";
import { procRun } from "./procActions";
import debug from "debug";
import tmp from "tmp-promise";

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
  const { packages, docker } = getState();
  await pkgForEach(packages, async pkg => {
    const dockerfilePath = resolve(pkg.path, "Dockerfile");
    log(`searching for ${dockerfilePath}`);
    if (!await fs.pathExists(dockerfilePath)) {
      return;
    }
    const latestTag = `${docker.prefix}/${pkg.name}:latest`;
    await dispatch(
      procRun("docker", ["build", "-t", latestTag, "."], {
        cwd: pkg.path
      })
    );
  });
};

export const dockerPush = ({ distTag } = {}) => async (dispatch, getState) => {
  const { packages, config, docker } = getState();
  const env = {};
  let tmpdir;
  if (config.docker.auth) {
    const auth = Buffer.from(config.docker.auth, "base64").toString();
    tmpdir = await tmp.dir();
    env.DOCKER_CONFIG = tmpdir.path;
    await fs.writeFile(resolve(tmpdir.path, "config.json"), auth);
  }
  await pkgForEach(packages, async pkg => {
    const { name } = pkg;
    const dockerfilePath = resolve(pkg.path, "Dockerfile");
    if (!await fs.pathExists(dockerfilePath)) {
      return;
    }
    const latestTag = `${docker.prefix}/${pkg.name}:latest`;
    const pushTags = [`${docker.pushPrefix}/${pkg.name}:${config.version}`];
    if (distTag) {
      pushTags.push(`${docker.pushPrefix}/${pkg.name}:${distTag}`);
    }
    for (const pushTag of pushTags) {
      await dispatch(
        procRun("docker", ["tag", latestTag, pushTag], { name, env })
      );
      await dispatch(procRun("docker", ["push", pushTag], { name, env }));
    }
  });
  if (config.docker.auth) {
    await fs.remove(tmpdir.path);
  }
};
