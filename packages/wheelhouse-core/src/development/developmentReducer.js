
import { CHANGE_BUTTON_STATUS } from "./developmentConstants";
import { CONFIG_LOADED } from "../config/configConstants";

const initialState = {
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

  return state;
}
