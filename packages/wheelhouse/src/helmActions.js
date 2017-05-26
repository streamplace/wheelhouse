import { safeLoad as parseYaml } from "js-yaml";
import { resolve } from "path";
import fs from "fs-extra";
import debug from "debug";
import { HELM_LOADED } from "wheelhouse-core";

const log = debug("wheelhouse:packagesActions");

export const helmLoad = pkgPath => async (dispatch, getState) => {
  log(`Loading ${pkgPath}`);
  const { rootDir } = getState().config;
  const pkgHelmPath = resolve(rootDir, pkgPath, "Chart.yaml");
  try {
    await fs.stat(pkgHelmPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      // This package doesn't have a Chart.yaml and that's just fine.
      return;
    }
    log(`Unexpected error attempting to stat ${pkgHelmPath}`, err);
    throw err;
  }
  const yamlFile = await fs.readFile(pkgHelmPath, "utf8");
  const pkg = parseYaml(yamlFile);
  await dispatch(
    helmLoaded({
      chartYaml: pkg
    })
  );
};

export const helmLoaded = ({ chartYaml }) => {
  return { type: HELM_LOADED, chartYaml };
};
