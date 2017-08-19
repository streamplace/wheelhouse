import { FILE_LOADED } from "../file/fileConstants";
import { CONFIG_LOADED } from "../config/configConstants";
// import { PACKAGES_LOADED } from "../packages/packagesConstants";
import parser from "docker-file-parser";

const initialState = {
  packages: {}
};

export default function(state = initialState, action) {
  // if (action.type === PACKAGES_LOADED) {
  //   return {
  //     ...state,
  //     packages: {
  //       ...state.packages,
  //       []
  //     }
  //   }
  // }
  if (action.type === CONFIG_LOADED) {
    return {
      ...state,
      prefix: action.configData.docker.prefix,
      // pushPrefix defaults to regular prefix if not provided
      pushPrefix:
        action.configData.docker.pushPrefix || action.configData.docker.prefix
    };
  }

  if (action.type === FILE_LOADED && action.name === "Dockerfile") {
    const lines = parser.parse(action.content);
    let from;
    for (const line of lines) {
      if (line.name === "FROM") {
        from = line.args;
        break;
      }
    }
    return {
      ...state,
      packages: {
        ...state.packages,
        [action.package]: { from }
      }
    };
  }

  return state;
}
