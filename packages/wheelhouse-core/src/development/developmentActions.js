import { serverStart } from "../server/serverActions";
import opn from "opn";
import { terminal as term } from "terminal-kit";
import { DEVELOPMENT_LOG } from "./developmentConstants";
import { kubernetesStartPullingData } from "../kubernetes/kubernetesActions";
import { getColor } from "../util/colors";
import { parseToRgb } from "polished";

let uid = 0;

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
    uid,
    text
  });
  uid += 1;
  const { red, green, blue } = parseToRgb(getColor(pkgName));
  term.colorRgb(red, green, blue)(pkgName);
  term.styleReset();
  term(` ${text}\n`);
};


