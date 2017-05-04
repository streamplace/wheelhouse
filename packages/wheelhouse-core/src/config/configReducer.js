
import { CONFIG_LOADED } from "./configConstants";

const initialState = {
  port: 3333,
};

export default function(state = initialState, action) {

  // In the event that this fires multiple times, we don't want to persist old configs
  if (action.type === CONFIG_LOADED) {
    return {
      ...initialState,
      ...action.configData,
    };
  }

  return state;
}
