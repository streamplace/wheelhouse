import { combineReducers } from "redux";
import { default as config } from "./config/configReducer";
import { default as development } from "./development/developmentReducer";
import { default as docker } from "./docker/dockerReducer";
import { default as file } from "./file/fileReducer";
import { default as helm } from "./helm/helmReducer";
import { default as kubernetes } from "./kubernetes/kubernetesReducer";
import { default as packages } from "./packages/packagesReducer";
import { default as s3 } from "./s3/s3Reducer";
import { default as server } from "./server/serverReducer";

export default combineReducers({
  config,
  development,
  docker,
  file,
  helm,
  kubernetes,
  packages,
  s3,
  server
});
