import { CONFIG_LOADED, CONFIG_ROOT_FOUND } from "./configConstants";

const initialState = {
  port: 3333
};

export default function(state = initialState, action) {
  if (action.type === CONFIG_ROOT_FOUND) {
    return {
      ...state,
      rootDir: action.rootDir
    };
  }

  if (action.type === CONFIG_LOADED) {
    return {
      ...state,
      ...action.configData
    };
  }

  return state;
}
