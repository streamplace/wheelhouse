import { PACKAGES_LOADED } from "./packagesConstants";

const initialState = {};

export default function(state = initialState, action) {
  if (action.type === PACKAGES_LOADED) {
    // Populate some optional fields so we can assume their existence elsewhere
    const allDependencies = new Set();
    if (action.packageJson.dependencies) {
      Object.keys(action.packageJson.dependencies).forEach(dep => {
        allDependencies.add(dep);
      });
    }
    if (action.packageJson.devDependencies) {
      Object.keys(action.packageJson.devDependencies).forEach(dep => {
        allDependencies.add(dep);
      });
    }
    if (!action.packageJson.wheelhouse) {
      action.packageJson.wheelhouse = {};
    }
    return {
      ...state,
      [action.packageJson.name]: {
        packageJson: action.packageJson,
        path: action.path,
        allDependencies: [...allDependencies]
      }
    };
  }

  return state;
}
