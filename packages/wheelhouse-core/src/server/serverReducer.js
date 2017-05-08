import { SERVER_DISCONNECT, SERVER_ERROR } from "./serverConstants";

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

  if (action.type === SERVER_ERROR) {
    return {
      ...state,
      notifications: [action.notification]
    };
  }

  return state;
}

// {message: "Hello", visible: false, date: 1234565}
