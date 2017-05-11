import { serverStart } from "./serverActions";
import { configLoad } from "./configActions";
import opn from "opn";
import { terminal as term } from "terminal-kit";
import { DEVELOPMENT_LOG, getColor } from "wheelhouse-core";
import { kubernetesStartPullingData } from "./kubernetesActions";
import { parseToRgb } from "polished";
import { generateUid } from "./util/uid";

export const developmentStart = () => async (dispatch, getState) => {
  await dispatch(serverStart());
  const port = getState().config.port;
  opn(`http://localhost:${port}/#/development`);
  dispatch(kubernetesStartPullingData());
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

export const developmentBuild = () => async dispatch => {
  await dispatch(configLoad());
};
