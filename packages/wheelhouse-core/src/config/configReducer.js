import {
  CONFIG_LOADED,
  CONFIG_ROOT_FOUND,
  CONFIG_PACKAGE_FOUND
} from "./configConstants";

const initialState = {
  port: 3333,
  packageDirs: []
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

  if (action.type === CONFIG_PACKAGE_FOUND) {
    return {
      ...state,
      packageDirs: [...state.packageDirs, action.dir]
    };
  }

  return state;
}
