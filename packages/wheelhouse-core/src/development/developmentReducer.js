
import { DEVELOPMENT_LOG, DEVELOPMENT_ENV_CHANGE } from "./developmentConstants";
import { PACKAGES_START, PACKAGES_STOP } from "../packages/packagesConstants";
import { PACKAGES_LOADED } from "../packages/packagesConstants";
import { getColor } from "../util/colors";

const initialState = {
  packages: [],
  logs: [],
};

export default function(state = initialState, action) {

  if (action.type === PACKAGES_LOADED) {
    const name = action.packageJson.name;
    // If we already know about this package, do nothing.
    if (state.packages.find(pkg => pkg.name === name)) {
      return state;
    }
    // Otherwise, add it to development controls.
    return {
      ...state,
      packages: [
        ...state.packages,
        {
          name: name,
          status: "STOPPED",
          active: false,
        }
      ]
    };
  }

  if (action.type === PACKAGES_START) {
    return {
      ...state,
      packages: state.packages.map((pkg) => {
        if (action.pkgName === pkg.name) {
          return {
            ...pkg,
            status: "STARTED",
            active: true,
          };
        }
        return pkg;
      })
    };
  }

  if (action.type === PACKAGES_STOP) {
    return {
      ...state,
      packages: state.packages.map((pkg) => {
        if (action.pkgName === pkg.name) {
          return {
            ...pkg,
            status: "STOPPED",
            active: false,
          };
        }
        return pkg;
      })
    };
  }

  if (action.type === DEVELOPMENT_LOG)  {
    const newObject = {
      appName: action.pkgName,
      color: getColor(action.pkgName),
      date: Date.now(),
      serverStatus: "",
      expectedAction: action.text };
    return Object.assign({}, state, {logs: [...state.logs, newObject]});
  }

  if (action.type === DEVELOPMENT_ENV_CHANGE) {
    const { variableName, currentValue } = action;

    return {
      ...state,
      env: {
        ...state.env,
        [variableName]: {
          ...state.env[variableName],
          currentValue: currentValue
        }
      }
    };
  }
  return state;
}
