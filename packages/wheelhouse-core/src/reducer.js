
import { combineReducers } from "redux";
import { default as config } from "./config/configReducer";
import { default as development } from "./development/developmentReducer";
import { default as kubernetes } from "./kubernetes/kubernetesReducer";

export default combineReducers({
  config,
  development,
  kubernetes
});
