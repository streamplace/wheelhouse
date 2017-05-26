import { serverStart } from "./serverActions";
import { configLoad } from "./configActions";
import opn from "opn";
import { terminal as term } from "terminal-kit";
import { DEVELOPMENT_LOG, getColor } from "wheelhouse-core";
import { kubernetesStartPullingData } from "./kubernetesActions";
import { parseToRgb } from "polished";
import { generateUid } from "./util/uid";
// import { pkgForEach } from "./util/graph";
import { packagesInstall, packagesLink, packagesRun } from "./packagesActions";
import { run } from "./util/run";

function isExplicitlyFalse(val) {
  return typeof val !== "undefined" && val === false;
}

export const developmentStart = script => async (dispatch, getState) => {
  await dispatch(configLoad());
  await dispatch(serverStart());
  await dispatch(packagesLink());
  if (script) {
    // The selected script runs in parallel with us. No await.
    dispatch(developmentRunScript(script));
  }
  const { packages } = getState();
  Object.keys(packages).forEach(pkgName => {
    if (packages[pkgName].packageJson.wheelhouse.autostart) {
      dispatch(packagesRun(pkgName, true));
    }
  });
  if (!isExplicitlyFalse(getState().config.openBrowserOnStartup)) {
    const port = getState().config.port;
    opn(`http://localhost:${port}/#/`);
  }
  dispatch(kubernetesStartPullingData());
};

export const developmentRunScript = script => async (dispatch, getState) => {
  const args = script.split(" ");
  const cmd = args.shift();
  await run("npm", ["run", cmd, "--", ...args], {
    stdout: line => dispatch(developmentLog("run", line)),
    stderr: line => dispatch(developmentLog("run", line)),
    cwd: getState().config.rootDir
  });
};

export const developmentInstall = () => async (dispatch, getState) => {
  await dispatch(configLoad());
  await dispatch(packagesInstall());
};

export const developmentLog = (pkgName, text) => dispatch => {
  if (text.trim().length === 0) {
    return;
  }
  dispatch({
    type: DEVELOPMENT_LOG,
    pkgName,
    uid: generateUid(),
    text
  });

  const { red, green, blue } = parseToRgb(getColor(pkgName));
  term.colorRgb(red, green, blue)(pkgName);
  term.styleReset();
  term(` ${text}\n`);
};

export const developmentBuild = () => async (dispatch, getState) => {
  await dispatch(configLoad());
};

export const developmentLint = () => async (dispatch, getState) => {
  await dispatch(configLoad());
  const { packages } = getState();
  let errored = "";
  for (let key in packages) {
    for (let lintingKey in packages[key].linting) {
      if (packages[key].linting[lintingKey]) {
        if (lintingKey === "chartAndPackageMatch" && !errored.length) {
          errored += "package.json and Chart.yaml are not in sync in:";
        }
        if (lintingKey === "chartAndPackageMatch") {
          errored += ` ${key}`;
        }
      }
    }
  }

  if (errored.length > 0) {
    throw new Error(`${errored}`);
  } else {
    dispatch(developmentLog("wheelhouse", "👍"));
  }
};
