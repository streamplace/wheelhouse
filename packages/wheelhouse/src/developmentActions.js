import { configLoad } from "./configActions";
import { terminal as term } from "terminal-kit";
import { DEVELOPMENT_LOG, getColor } from "wheelhouse-core";
import { parseToRgb } from "polished";
import { generateUid } from "./util/uid";

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
