import { SERVER_DISCONNECT, SERVER_ERROR } from "./serverConstants";

const initialState = {
  connected: true,
  showNotification: true,
  notifications: []
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
      notifications: [...state.notifications, action.notification],
      showNotification: true
    };
  }

  return state;
}

// {message: "Hello", visible: false, date: 1234565}
