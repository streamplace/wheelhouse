import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { SERVER_SYNC_STATE, SERVER_DISCONNECT, reducer } from "wheelhouse-core";

const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create WebSocket connection.
const socket = new WebSocket(`ws://${window.location.host}/api`);

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
      store = createStore(
        reducer,
        action.state,
        composeEnhancers(
          applyMiddleware(thunk, logger),
          applyMiddleware(sendToServer)
        )
      );
      resolve(store);
    } else {
      // Flag this as from the server, so we don't send it back up.
      action._fromServer = true;
      store.dispatch(action);
    }
  });

  socket.addEventListener("close", function() {
    store.dispatch({
      type: SERVER_DISCONNECT,
      _fromServer: true
    });
  });
});
