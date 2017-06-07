import { FILE_LOADED } from "../file/fileConstants";
// import { PACKAGES_LOADED } from "../packages/packagesConstants";
import parser from "docker-file-parser";

const initialState = {
  packages: {},
  orphaned: {}
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
