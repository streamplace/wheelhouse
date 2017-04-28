
import { CHANGE_BUTTON_STATUS, DEVELOPMENT_LOG } from "./developmentConstants";
import { CONFIG_LOADED } from "../config/configConstants";

const initialState = {
  logs: [],
  packages: []
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

  return state;
}
