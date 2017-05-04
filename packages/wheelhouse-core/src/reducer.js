import { combineReducers } from "redux";
import { default as config } from "./config/configReducer";
import { default as development } from "./development/developmentReducer";
import { default as packages } from "./packages/packagesReducer";
import { default as kubernetes } from "./kubernetes/kubernetesReducer";
//import { default as notifications } from "./notifications/notificationsReducer";
export default combineReducers({
  config,
  development,
  packages,
  kubernetes,
  //notifications
});
