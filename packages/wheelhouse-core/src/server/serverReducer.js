import { SERVER_DISCONNECT } from "./serverConstants";

const initialState = {
  connected: true
};

export default function(state = initialState, action) {
  if (action.type === SERVER_DISCONNECT) {
    return {
      ...state,
      connected: false
    };
  }

  return state;
}
