import { PACKAGES_LOADED, PACKAGES_UPLOADED } from "./packagesConstants";

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

    // Store the first load of package.json so we can restore it later if we wanna
    let originalContent;
    if (
      state[action.packageJson.name] &&
      state[action.packageJson.name].originalContent
    ) {
      originalContent = state[action.packageJson.name].originalContent;
    } else {
      originalContent = action.content;
    }

    return {
      ...state,
      ...otherPackages,
      [action.packageJson.name]: {
        name: action.packageJson.name,
        packageJson: action.packageJson,
        path: action.path,
        allDependencies: [...allDependencies],
        localDependencies,
        originalContent
      }
    };
  }

  if (action.type === PACKAGES_UPLOADED) {
    return {
      ...state,
      [action.name]: {
        ...state[action.name],
        buildUrl: action.url
      }
    };
  }

  return state;
}
