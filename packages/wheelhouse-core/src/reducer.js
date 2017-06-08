import { combineReducers } from "redux";
import { default as config } from "./config/configReducer";
import { default as development } from "./development/developmentReducer";
import { default as packages } from "./packages/packagesReducer";
import { default as kubernetes } from "./kubernetes/kubernetesReducer";
import { default as server } from "./server/serverReducer";
import { default as file } from "./file/fileReducer";

export default combineReducers({
  config,
  development,
  packages,
  kubernetes,
  server,
  file
});
