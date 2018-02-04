/**
 * Main Wheelhouse actions. The main CLI commands map 1-1 with these. If you're going to build
 * a non-CLI interface into Wheelhouse, it could call these functions.
 */

import { configInit } from "./configActions";
import { serverStart } from "./serverActions";
import { helmBuild, helmPush, helmBootstrap, helmCleanup } from "./helmActions";
import {
  packagesInit,
  packagesLink,
  packagesStart,
  packagesBuild,
  packagesCleanup
} from "./packagesActions";
import { dockerInit, dockerBuild, dockerPush } from "./dockerActions";
import { s3Init, s3Cleanup } from "./s3Actions";
import { developmentLog } from "./developmentActions";
import { kubernetesStartPullingData } from "./kubernetesActions";
import { run } from "./util/run";

/**
 * Runs on Wheelhouse startup for every other action.
 */
export const wheelhouseInit = () => async (dispatch, getState) => {
  await dispatch(configInit());
  await dispatch(packagesInit());
  await dispatch(dockerInit());
};

/**
 * wheelhouse install
 */
export const wheelhouseInstall = () => async (dispatch, getState) => {
  await dispatch(wheelhouseInit());
  await dispatch(s3Init());
  await dispatch(packagesBuild({ install: true }));
  await dispatch(packagesCleanup());
  await dispatch(s3Cleanup());
};

/**
 * wheelhouse link
 */
export const wheelhouseLink = () => async (dispatch, getState) => {
  await dispatch(wheelhouseInit());
  await dispatch(packagesLink());
};

/**
 * wheelhouse start/run/dev
 */
export const wheelhouseStart = opts => async (dispatch, getState) => {
  const { script, disableKube, startApps } = opts;
  await dispatch(wheelhouseInit());
  // Start implies link.
  await dispatch(wheelhouseLink());

  await dispatch(serverStart());

  // #hack this exists for the `run/stage` C-SATS dev environment
  if (script) {
    // The selected script runs in parallel with us. No await.
    dispatch(wheelhouseStartupScript(script));
  }

  await dispatch(packagesStart(startApps));

  if (!disableKube) {
    dispatch(kubernetesStartPullingData());
  }
};

// #hack for C-SATS `run/stage` script to run on start. should have a better way to do "run this
// script on this file" soon
export const wheelhouseStartupScript = script => async (dispatch, getState) => {
  const args = script.split(" ");
  const cmd = args.shift();
  await run("npm", ["run", cmd, "--", ...args], {
    stdout: line => dispatch(developmentLog("run", line)),
    stderr: line => dispatch(developmentLog("run", line)),
    cwd: getState().config.rootDir
  });
};

/**
 * wheelhouse build
 */
export const wheelhouseBuild = systems => async dispatch => {
  await dispatch(wheelhouseInit());
  let [packages, docker, helm] = ["packages", "docker", "helm"].map(sys =>
    systems.includes(sys)
  );
  let err;
  try {
    // If any of this fails, we want to clean up our files before crashing, thus try/catch
    packages && (await dispatch(s3Init()));
    packages && (await dispatch(packagesBuild()));
    docker && (await dispatch(dockerBuild()));
    helm && (await dispatch(helmBuild()));
  } catch (e) {
    err = e;
  }
  packages && (await dispatch(packagesCleanup()));
  packages && (await dispatch(s3Cleanup()));
  if (err) {
    throw err;
  }
};

export const wheelhousePush = (opts = {}) => async dispatch => {
  await dispatch(wheelhouseInit());
  await dispatch(s3Init());
  await dispatch(dockerPush(opts));
  await dispatch(helmPush());
};

export const wheelhouseClean = () => async dispatch => {
  await dispatch(wheelhouseInit());
  await dispatch(helmCleanup());
};

export const wheelhouseBootstrap = () => async dispatch => {
  await dispatch(wheelhouseInit());
  await dispatch(s3Init());
  await dispatch(helmBootstrap());
};

/**
 * wheelhouse repo-version
 */
export const wheelhouseRepoVersion = () => async (dispatch, getState) => {
  await dispatch(wheelhouseInit());
  const state = getState();
  process.stdout.write(state.config.version);
};

/**
 * wheelhouse set-version
 */
// export const wheelhouseBuild = () => async (dispatch, getState) => {
//   await dispatch(wheelhouseInit());
//   await dispatch(packagesBuild());
//   await dispatch(dockerBuild());
// };
