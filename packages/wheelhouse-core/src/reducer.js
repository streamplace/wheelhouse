
import { combineReducers } from "redux";
import { default as config } from "./config/configReducer";
import { default as development } from "./development/developmentReducer";

export default combineReducers({
  config,
  development,
});
