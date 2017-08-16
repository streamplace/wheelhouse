const initialState = {};

import { HELM_BUILT } from "./helmConstants";

export default function(state = initialState, action) {
  if (action.type === HELM_BUILT) {
    return {
      ...state,
      [action.pkgName]: {
        chartPath: action.chartPath
      }
    };
  }
  return state;
}
