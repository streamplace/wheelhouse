import { METEOR_PACKAGE_LOADED } from "./meteorConstants";
import { resolve } from "path";

const initialState = {
  packages: {}
};

export default function(state = initialState, action) {
  if (action.type === METEOR_PACKAGE_LOADED) {
    return {
      ...state,
      packages: {
        ...state.packages,
        [action.pkgName]: {
          packageJs: action.packageJs,
          path: action.path,
          outputDir: resolve(action.path, "dist")
        }
      }
    };
  }
  return state;
}
