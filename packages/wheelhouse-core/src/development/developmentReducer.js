
import { CHANGE_BUTTON_STATUS, DEVELOPMENT_LOG, DEVELOPMENT_ENV_CHANGE } from "./developmentConstants";
import { CONFIG_LOADED } from "../config/configConstants";

const initialState = {
  logs: [],
  packages: [],
  env: []
};

export default function(state = initialState, action) {

  if (action.type === CHANGE_BUTTON_STATUS) {
    const newPackages = state.packages.map((pkg) => {
      if (pkg.name === action.name) {
        return {
          ...pkg,
          status: pkg.active ? "STOPPED" : "STARTED",
          active: !pkg.active,
        };
      }
      return pkg;
    });
    return {
      ...state,
      packages: newPackages,
    };
  }

  if (action.type === CONFIG_LOADED) {
    let newPackages = [];
    let newEnv = [];

    action.configData.packages.forEach((pkgName) => {
      if (state.packages.find(pkg => pkg.name === pkgName)) {
        return;
      }
      newPackages.push({
        name: pkgName,
        status: "STOPPED",
        active: false,
      });
    });

    action.configData.env.forEach((envName, envValue) => {
      if (state.env.find(env => env.name === envName)) {
        return;
      }
      if (state.env.find(env => env.value === envValue)) {
        return;
      }
      newEnv.push({
        name: envName,
        value: envValue
      });
    });

    newPackages = state.packages
      .concat(newPackages)
      .filter((pkg) => action.configData.packages.includes(pkg.name));
    newEnv = state.env
      .concat(newEnv)
      .filter((env) => action.configData.env.includes(env.name, env.value));

    return {
      ...state,
      packages: newPackages,
      env: newEnv,
    };
  }

  if (action.type === DEVELOPMENT_LOG)  {
    const newObject = { appName: "Mendoza",
      serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
      expectedAction: "[17.015ms] About to convert to expected version" };
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
