import { CONFIG_LOADED } from "../config/configConstants";
import { S3_CREDENTIALS } from "./s3Constants";

const initialState = {
  credentials: {}
};

export default function(state = initialState, action) {
  if (action.type === CONFIG_LOADED) {
    return {
      ...state,
      credentials: {
        ...state.credentials,
        ...action.configData.s3
      }
    };
  }

  if (action.type === S3_CREDENTIALS) {
    return {
      ...state,
      credentials: {
        ...state.credentials,
        accessKeyId: action.accessKeyId,
        secretAccessKey: action.secretAccessKey,
        url: action.url
      }
    };
  }
  return state;
}
