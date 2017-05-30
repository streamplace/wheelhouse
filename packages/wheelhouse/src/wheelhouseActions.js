/**
 * Main Wheelhouse actions. The main CLI commands map 1-1 with these. If you're going to build
 * a non-CLI interface into Wheelhouse, it could call these functions.
 */

import { configInit } from "./configActions";
import { serverStart } from "./serverActions";
import {
  packagesInit,
  packagesLink,
  packagesInstall,
  packagesStart
} from "./packagesActions";
import { developmentLog } from "./developmentActions";
import { kubernetesStartPullingData } from "./kubernetesActions";
import { run } from "./util/run";

/**
 * Runs on Wheelhouse startup for every other action.
 */
export const wheelhouseInit = () => async (dispatch, getState) => {
  await dispatch(configInit());
  await dispatch(packagesInit());
};

/**
 * wheelhouse install
 */
export const wheelhouseInstall = () => async (dispatch, getState) => {
  await dispatch(wheelhouseInit());
  await dispatch(packagesInstall());
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
export const wheelhouseStart = script => async (dispatch, getState) => {
  await dispatch(wheelhouseInit());
  // Start implies link.
  await dispatch(wheelhouseLink());

  await dispatch(serverStart());

  // #hack this exists for the `run/stage` C-SATS dev environment
  if (script) {
    // The selected script runs in parallel with us. No await.
    dispatch(wheelhouseStartupScript(script));
  }

  await dispatch(packagesStart());

  dispatch(kubernetesStartPullingData());
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
export const wheelhouseBuild = () => async (dispatch, getState) => {
  await dispatch(wheelhouseInit());
};
