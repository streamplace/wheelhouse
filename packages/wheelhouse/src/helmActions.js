import debug from "debug";
import { pkgForEach } from "./util/graph";
import { resolve } from "path";
import fs from "fs-extra";
import { procRun } from "./procActions";
import { fileLoad, fileWrite, fileRevert } from "./fileActions";
import { HELM_BUILT } from "wheelhouse-core";

const log = debug("wheelhouse:helmActions");

export const helmBuild = () => async (dispatch, getState) => {
  const { packages, config } = getState();
  const chartDir = resolve(config.rootDir, ".wheelhouse", "charts");
  await fs.ensureDir(chartDir);
  await pkgForEach(packages, async pkg => {
    const { helm } = getState();
    const chartPath = resolve(pkg.path, "Chart.yaml");
    const reqsPath = resolve(pkg.path, "requirements.yaml");
    log(`searching for ${chartPath}`);
    if (!await fs.pathExists(chartPath)) {
      return;
    }
    // If we have dependencies, populate our /charts directory
    if (await fs.pathExists(reqsPath)) {
      const requirements = await dispatch(fileLoad(reqsPath));
      const reqsDir = resolve(pkg.path, "charts");
      await fs.remove(reqsDir);
      await fs.ensureDir(reqsDir);
      for (const { name } of requirements.data.dependencies) {
        if (!helm[name]) {
          throw new Error(
            `We have ${name} as a dependency but haven't bulilt that chart`
          );
        }
        const { chartPath } = helm[name];
        const destName = `${name}-${config.version}.tgz`;
        await fs.copy(chartPath, resolve(reqsDir, destName));
      }
    }
    const { data } = await dispatch(fileLoad(chartPath));
    await dispatch(
      fileWrite(chartPath, {
        ...data,
        version: config.version
      })
    );
    await dispatch(
      procRun("helm", ["package", "--debug", "-d", chartDir, "."], {
        cwd: pkg.path
      })
    );
    dispatch({
      type: HELM_BUILT,
      pkgName: pkg.name,
      chartPath: resolve(chartDir, `${pkg.name}-${config.version}.tgz`)
    });
    await dispatch(fileRevert(chartPath));
  });
};
