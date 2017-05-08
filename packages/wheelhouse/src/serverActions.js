import express from "express";
import WebSocket from "ws";
import http from "http";
import proxy from "http-proxy-middleware";
import { configLoad } from "./configActions";
import { SERVER_SYNC_STATE } from "wheelhouse-core";
import debug from "debug";

const log = debug("wheelhouse:serverActions");

/**
 * Promise helper for apps listening. Returns the port.
 */
const serverListen = function(server, port) {
  return new Promise((resolve, reject) => {
    server.listen(port, function() {
      resolve(server.address().port);
    });
  });
};

//const serverError = function(message) {
//puts a date stamp
//visible stamp
//then fire off SERVER_ERROR

// }
const clients = [];

export const serverStart = () => async (dispatch, getState) => {
  await dispatch(configLoad());
  const port = getState().config.port;
  const app = express();

  // This is a little zany because we need to support two websockets -- in development we need to
  // proxy through to the create-react-app development server, and both development and production
  // use the wheelhouse API port. So we first make a secondary random-port server for websockets.

  const websocketServer = http.createServer();
  const wss = new WebSocket.Server({ server: websocketServer });
  wss.on("connection", function connection(ws) {
    clients.push(ws);

    ws.on("message", function incoming(message) {
      log(`Client says: ${message}`);
      const action = JSON.parse(message);
      action._fromClient = true;
      dispatch(action);
    });

    ws.on("close", function() {
      const index = clients.indexOf(ws);
      clients.splice(index, 1);
    });

    ws.on("error", err => {
      log(err);
    });

    ws.send(
      JSON.stringify({
        type: SERVER_SYNC_STATE,
        state: getState()
      })
    );
  });

  const websocketPort = await serverListen(websocketServer);
  log(`Websocket Server listnening on localhost:${websocketPort}`);

  // Cool. With that taken care of, we set up our actual server to proxy as appropriate.
  const server = http.createServer(app);

  app.use(
    proxy("http://localhost:3000/", {
      logLevel: "warn",
      ws: true,
      router: {
        [`localhost:${port}/api`]: `http://localhost:${websocketPort}`
      }
    })
  );

  return await serverListen(server, port);
};

export const serverSendAction = action => {
  const message = JSON.stringify(action);
  clients.forEach(client => {
    client.send(message);
  });
};
