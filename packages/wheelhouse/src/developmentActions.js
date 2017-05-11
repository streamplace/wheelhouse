import { serverStart } from "./serverActions";
import opn from "opn";
import { terminal as term } from "terminal-kit";
import { DEVELOPMENT_LOG, getColor } from "wheelhouse-core";
import { kubernetesStartPullingData } from "./kubernetesActions";
import { parseToRgb } from "polished";
import { run } from "./proc";
import { homedir } from "os";

let uid = 0;

export const developmentStart = () => async (dispatch, getState) => {
  await dispatch(serverStart());
  const port = getState().config.port;
  opn(`http://localhost:${port}/#/development`);
  dispatch(kubernetesStartPullingData());
};

export const developmentKubeUp = () => async (dispatch, getState) => {};

export const developmentKubeDown = () => {};

export const developmentLog = (pkgName, text) => dispatch => {
  dispatch({
    type: DEVELOPMENT_LOG,
    pkgName,
    uid,
    text
  });
  uid += 1;
  const { red, green, blue } = parseToRgb(getColor(pkgName));
  term.colorRgb(red, green, blue)(pkgName);
  term.styleReset();
  term(` ${text}\n`);
};
