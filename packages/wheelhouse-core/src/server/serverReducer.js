import {
  SERVER_DISCONNECT,
  SERVER_ERROR,
  SERVER_ACKNOWLEDGE_NOTIFICATION
} from "./serverConstants";

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

  if (action.type === SERVER_ACKNOWLEDGE_NOTIFICATION) {
    const notificationsCopy = [...state.notifications];
    let index = 0;
    let itemFound = false;
    while (!itemFound) {
      if (notificationsCopy[index].uid === action.uid) {
        itemFound = true;
      } else {
        index++;
      }
    }
    notificationsCopy[index].visible = false;
    return {
      ...state,
      notifications: notificationsCopy
    };
  }

  return state;
}
