import { PACKAGES_LOADED, PACKAGES_CHECK_SYNC } from "./packagesConstants";
import { HELM_LOADED } from "../helm/helmConstants";
import { outOfSync, addLintingErrorStatuses } from "../util/sync.js";

const initialState = {};

export default function(state = initialState, action) {
  if (action.type === PACKAGES_LOADED) {
    // Populate some optional fields so we can assume their existence elsewhere
    const { name } = action.packageJson;
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

    // Check all the existing packages and update the dependency tree as appropriate
    const localDependencies = [];
    const otherPackages = {};
    for (let pkgName of Object.keys(state)) {
      const otherPkg = state[pkgName];
      // Do we require this package?
      if (allDependencies.has(pkgName)) {
        localDependencies.push(pkgName);
      }

      // Does this package require us?
      if (state[pkgName].allDependencies.includes(name)) {
        otherPackages[pkgName] = {
          ...otherPkg,
          localDependencies: [...otherPkg.localDependencies, name]
        };
      }
    }

    return {
      ...state,
      ...otherPackages,
      [action.packageJson.name]: {
        name: action.packageJson.name,
        packageJson: action.packageJson,
        path: action.path,
        allDependencies: [...allDependencies],
        localDependencies
      }
    };
  }

  if (action.type === HELM_LOADED) {
    let name = action.chartYaml.name;
    let stateCopy = Object.assign({}, state);
    stateCopy[name].chartYaml = action.chartYaml;
    return (state = stateCopy);
  }

  if (action.type === PACKAGES_CHECK_SYNC) {
    const errorStatuses = outOfSync(state);
    let stateCopy = Object.assign({}, state);
    addLintingErrorStatuses(errorStatuses, stateCopy);
    return (state = stateCopy);
  }

  return state;
}
