import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { CONFIG_LOAD } from "./config/configConstants";
import { configLoad } from "./config/configActions";
import { KUBERNETES_DELETE_POD } from "./kubernetes/kubernetesConstants";
import { kubernetesDeletePod } from "./kubernetes/kubernetesActions";
import { PACKAGES_RUN } from "./packages/packagesConstants";
import { packagesRun } from "./packages/packagesActions";
import { serverSendAction } from "./server/serverActions";

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
