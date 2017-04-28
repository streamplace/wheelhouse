
import { CHANGE_BUTTON_STATUS, DEVELOPMENT_LOG, DEVELOPMENT_ENV_CHANGE } from "./developmentConstants";
import { CONFIG_LOADED } from "../config/configConstants";

const initialState = {
  logs: [],
  packages: [],
  env: {
    CSATS_DB_URL: {
      currentValue: "mongo://localhost/stage",
      presetValues: [
        {
          name: "dev",
          value: "mongo://localhost/dev"
        },
        {
          name: "stage",
          value: "mongo://localhost/stage"
        }
      ]
    },
    STREAMPLACE_API_SERVER: {
      currentValue: "https://butt.fish",
      presetValues: [
        {
          name: "dev",
          value: "https://test.sp-dev.club"
        },
        {
          name: "local",
          value: "http://localhost"
        },
        {
          name: "prod",
          value: "https://stream.place"
        }
      ]
    }
  },
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
    newPackages = state.packages
      .concat(newPackages)
      .filter((pkg) => action.configData.packages.includes(pkg.name));
    return {
      ...state,
      packages: newPackages,
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
    //object destructuring for action

    // Old way:
    // const newEnv = { ...state.env };
    // const newEnvField = { ...newEnv[variableName] };
    // newEnvField.currentValue = currentValue;
    // newEnv[variableName] = newEnvField;
    // return {
    //   ...state,
    //   env: newEnv
    // };
    return {
      ...state,
      env: {
        ...state.env,
        //make a copy of the env
        [variableName]: {
          ...state.env[variableName],
          //make a copy of one variable's object
          currentValue: currentValue
        }
      }
    };
  }
  return state;
}
