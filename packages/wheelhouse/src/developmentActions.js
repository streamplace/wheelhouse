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

export const developmentStart = () => async (dispatch, getState) => {
  await dispatch(configLoad());
  await dispatch(serverStart());
  await dispatch(packagesInstall());
  await dispatch(packagesLink());
  const { packages } = getState();
  Object.keys(packages).forEach(pkgName => {
    if (packages[pkgName].packageJson.wheelhouse.autostart) {
      dispatch(packagesRun(pkgName, true));
    }
  });
  const port = getState().config.port;
  opn(`http://localhost:${port}/#/development`);
  dispatch(kubernetesStartPullingData());
};

export const developmentInstall = () => async (dispatch, getState) => {
  await dispatch(configLoad());
  await dispatch(packagesInstall());
};

export const developmentLog = (pkgName, text) => dispatch => {
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
