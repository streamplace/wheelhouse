
import { PACKAGES_LOADED } from "./packagesConstants";

const initialState = {};

export default function(state = initialState, action) {

  if (action.type === PACKAGES_LOADED) {
    return {
      ...state,
      [action.packageJson.name]: {
        packageJson: action.packageJson,
        path: action.path,
      }
    };
  }

  return state;
}
