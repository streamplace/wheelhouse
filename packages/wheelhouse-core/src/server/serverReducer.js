
import {
  SERVER_DISCONNECT,
  SERVER_ERROR,
  SERVER_ACKNOWLEDGE_NOTIFICATION
} from "./serverConstants";

const initialState = {
  connected: true,
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
      notifications: [...state.notifications, action.notification]
    };
  }

  if (action.type === SERVER_ACKNOWLEDGE_NOTIFICATION) {
    const notificationsCopy = [...state.notifications];
    let index;
    state.notifications.find((note, idx) => {
      if (note.uid === action.uid) {
        index = idx;
        return true;
      }
    });

    notificationsCopy[index] = {
      ...notificationsCopy[index],
      visible: false
    };
    return {
      ...state,
      notifications: notificationsCopy
    };
  }

  return state;
}

