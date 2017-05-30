import express from "express";
import WebSocket from "ws";
import http from "http";
import proxy from "http-proxy-middleware";
import {
  SERVER_SYNC_STATE,
  SERVER_ERROR,
  SERVER_UPDATE,
  timeConverter
} from "wheelhouse-core";
import debug from "debug";
import path from "path";
import updateNotifier from "update-notifier";
import { generateUid } from "./util/uid";
import pkg from "../package.json";
import opn from "opn";

const log = debug("wheelhouse:serverActions");

/**
 * Promise helper for apps listening. Returns the port.
 */

// The port = 0 default is a Linux workaround.
// See https://github.com/FWeinb/nodeshot/issues/11#issuecomment-228529517
const serverListen = function(server, port = 0) {
  return new Promise((resolve, reject) => {
    server.listen(port, function() {
      resolve(server.address().port);
    });
  });
};

export const serverError = message => dispatch => {
  const time = timeConverter(Date.now());
  const notification = {
    message,
    date: time,
    visible: true,
    uid: generateUid(),
    level: "error"
  };

  dispatch({
    type: SERVER_ERROR,
    notification
  });
};

const clients = [];

export const serverStart = () => async (dispatch, getState) => {
  const port = getState().config.port;
  const app = express();

  // This is a little zany because we need to support two websockets -- in development we need to
  // proxy through to the create-react-app development server, and both development and production
  // use the wheelhouse API port. So we first make a secondary random-port server for websockets.

  const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 5
  });

  if (notifier.update) {
    const message = `Update available ${notifier.update.current} → ${notifier.update.latest}
      Run npm i -g ${notifier.update.name} to update`;
    dispatch({
      type: SERVER_UPDATE,
      level: "info",
      message,
      position: "bl",
      autoDismiss: 0,
      updateInfo: notifier.update,
      uid: generateUid()
    });
  }

  notifier.notify({
    defer: false
  });

  if (!(getState().config.openBrowserOnStartup !== false)) {
    const port = getState().config.port;
    opn(`http://localhost:${port}/#/`);
  }

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

  let staticServerUrl;
  if (process.env.WH_LOCAL_DEV === "true") {
    staticServerUrl = "http://localhost:3942";
    log(`Proxying to create-react-app at ${staticServerUrl}`);
  } else {
    const staticApp = express();
    const frontendModule = require.resolve("wheelhouse-frontend");
    const frontendPath = path.resolve(path.dirname(frontendModule), "build");
    staticApp.use(express.static(frontendPath));
    const staticServer = http.createServer(staticApp);
    const staticPort = await serverListen(staticServer);
    staticServerUrl = `http://localhost:${staticPort}`;
    log(`Static wheelhouse-frontend listening at ${staticServerUrl}`);
  }

  // Why "healthz"? I don't really know, but kubernetes people seem to use that name for health
  // check endpoints a lot. The client uses this to detect we're back up and reconnect.
  app.get("/healthz", (req, res) => res.sendStatus(200));

  app.use(
    proxy(staticServerUrl, {
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
