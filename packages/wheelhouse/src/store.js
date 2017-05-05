import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  reducer,
  CONFIG_LOAD,
  KUBERNETES_DELETE_POD,
  PACKAGES_RUN
} from "wheelhouse-core";
import { configLoad } from "./configActions";
import { kubernetesDeletePod } from "./kubernetesActions";
import { packagesRun } from "./packagesActions";
import { serverSendAction } from "./serverActions";

const receiveFromClient = otherStore => next => action => {
  if (action._fromClient) {
    if (action.type === CONFIG_LOAD) {
      store.dispatch(configLoad());
      return;
    }

    if (action.type === PACKAGES_RUN) {
      store.dispatch(packagesRun(action.package, action.status));
      return;
    }

    if (action.type === KUBERNETES_DELETE_POD) {
      store.dispatch(kubernetesDeletePod(action.appName));
      return;
    }
  }

  serverSendAction(action);

  // If the action came from the client, not the server, send it up there!
  return next(action);
};

export const store = createStore(
  reducer,
  compose(applyMiddleware(thunk), applyMiddleware(receiveFromClient))
);
