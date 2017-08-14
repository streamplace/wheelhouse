/**
 * Data structure for files:
 *  path: absolute path of the file
 *  name: "package.json" or "Dockerfile" or w/e
 *  content: content of the file
 *  data: if this is a file we know how to read (e.g. JSON, YAML), the file's data
 */

import { FILE_LOADED } from "./fileConstants";

const initialState = {};

export default function(state = initialState, action) {
  if (action.type === FILE_LOADED) {
    return {
      ...state,
      [action.path]: {
        path: action.path,
        content: action.content,
        name: action.name,
        data: action.data,
        hash: action.hash
      }
    };
  }

  return state;
}
