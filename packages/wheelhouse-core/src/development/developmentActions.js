
import { serverStart } from "../server/serverActions";
import opn from "opn";

export const developmentStart = () => async (dispatch, getState) => {
  await dispatch(serverStart());
  const port = getState().config.port;
  opn(`http://localhost:${port}/#/development`);
};
