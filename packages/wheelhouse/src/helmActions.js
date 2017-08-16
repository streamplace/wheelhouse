import debug from "debug";
import { pkgForEach } from "./util/graph";
import { resolve } from "path";
import fs from "fs-extra";
import { procRun } from "./procActions";
import { fileLoad, fileWrite, fileRevert } from "./fileActions";
import { HELM_BUILT } from "wheelhouse-core";
import { s3GetFile, s3PutFile } from "./s3Actions";
import { developmentLog } from "./developmentActions";
import tmp from "tmp-promise";

const log = debug("wheelhouse:helmActions");

export const helmBuild = () => async (dispatch, getState) => {
  const { packages, config } = getState();
  // We stash the built charts in a different directory b/c
  // https://twitter.com/elimallon/status/896834495520714752
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

export const helmGetIndex = () => async (dispatch, getState) => {
  const { config } = getState();
  const indexPath = resolve(
    config.rootDir,
    ".wheelhouse",
    "charts",
    "index.yaml"
  );
  return await dispatch(
    s3GetFile({ objectName: "index.yaml", filePath: indexPath })
  );
};

export const helmBootstrap = () => async (dispatch, getState) => {
  const { config } = getState();
  // We're expecting a 404 when we try and get the index.
  let errored = false;
  try {
    await dispatch(helmGetIndex());
  } catch (e) {
    errored = true;
  }
  if (!errored) {
    throw new Error(`${config.s3.url}/index.yaml exists, can't bootstrap."`);
  }
  const emptyFile = await tmp.file();
  await fs.writeFile(emptyFile.path, "apiVersion: v1");
  await dispatch(
    s3PutFile({
      filePath: emptyFile.path,
      objectName: "index.yaml"
    })
  );
  dispatch(developmentLog("helm", `${config.s3.url}/index.yaml created`));
};

// #!/bin/bash

// set -o errexit
// set -o nounset
// set -o pipefail

// ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
// source "$ROOT/run/common.sh"

// if [[ "${AWS_ACCESS_KEY_ID:-}" == "" ]]; then
//   echo "No AWS_ACCESS_KEY_ID found, not pushing charts."
//   exit 0
// fi

// cd "$ROOT"
// npm install
// mkdir -p "$ROOT/build_chart"
// rm -rf "$ROOT/build_chart/*"
// cd "$ROOT/build_chart"
// mv "$ROOT"/packages/*/*.tgz .
// oldIndex=$(mktemp).yaml
// curl -o $oldIndex "https://charts.stream.place/index.yaml"
// helm repo index --url https://charts.stream.place --merge $oldIndex .
// rm $oldIndex
// aws s3 --region us-west-2 sync . s3://charts.stream.place

export const helmPush = () => async (dispatch, getState) => {
  await dispatch(helmGetIndex());
  const { config } = getState();
  const chartsPath = resolve(config.rootDir, ".wheelhouse", "charts");
  const indexPath = resolve(chartsPath, "index.yaml");
  await dispatch(
    procRun(
      "helm",
      ["repo", "index", "--url", config.s3.url, "--merge", indexPath, "."],
      {
        cwd: chartsPath
      }
    )
  );
  // Now sync the entire directory!
  for (const filename of await fs.readdir(chartsPath)) {
    const { url } = await dispatch(
      s3PutFile({
        objectName: filename,
        filePath: resolve(chartsPath, filename)
      })
    );
    dispatch(developmentLog("helm", `uploaded ${url}`));
  }
};
