import {
  CONFIG_LOADED,
  CONFIG_ROOT_FOUND,
  CONFIG_PACKAGE_FOUND,
  CONFIG_VERSION
} from "./configConstants";

const initialState = {
  port: 3333,
  packageDirs: [],
  openBrowserOnStartup: false
};

export default function(state = initialState, action) {
  if (action.type === CONFIG_ROOT_FOUND) {
    return {
      ...state,
      rootDir: action.rootDir,
      rootName: action.rootName
    };
  }

  if (action.type === CONFIG_VERSION) {
    return {
      ...state,
      version: action.version
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
