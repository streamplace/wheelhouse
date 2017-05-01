
import { ADD_UPDATED_LOG, CHANGE_BUTTON_STATUS, DEVELOPMENT_LOG, DEVELOPMENT_ENV_CHANGE } from "./developmentConstants";
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
    const otherNewObject = { appName: "Maestro",
      serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
      expectedAction: "[17.015ms] About to convert to expected version" };
    const yetAnotherNewObject =  { appName: "Clydesdale",
      serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
      expectedAction: "[17.015ms] About to convert to expected version" };
    return Object.assign({}, state, {logs: [...state.logs, newObject, otherNewObject, yetAnotherNewObject]});
  }

  if (action.type === ADD_UPDATED_LOG) {
    const updatedLog = { appName: "Meteor",
      serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
      expectedAction: "[17.015ms] About to convert to expected version" };
    return Object.assign({}, state, {logs: [...state.logs, updatedLog]});
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
