import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { SERVER_SYNC_STATE, reducer } from "wheelhouse-core";

// Create WebSocket connection.
const socket = new WebSocket(`ws://${window.location.host}/api`);

// Connection opened
// let open = false;

// socket.addEventListener("open", function(event) {
//   open = true;
// });

const sendToServer = store => next => action => {
  // If the action came from the client, not the server, send it up there!
  if (!action._fromServer) {
    socket.send(JSON.stringify(action));
    return;
  }

  return next(action);
};


export default new Promise((resolve, reject) => {

  let store;

  socket.addEventListener("message", function(event) {
    const action = JSON.parse(event.data);
    // Special initialization action that runs at the start.
    if (action.type === SERVER_SYNC_STATE) {
      store = createStore(reducer, action.state, compose(
        applyMiddleware(thunk),
        applyMiddleware(sendToServer)
      ));
      resolve(store);
    }
    else {
      // Flag this as from the server, so we don't send it back up.
      action._fromServer = true;
      store.dispatch(action);
    }
  });
});
