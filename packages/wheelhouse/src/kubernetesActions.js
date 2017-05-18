import { KUBERNETES_DATA } from "wheelhouse-core";
import { serverError } from "./serverActions";
import { runKube } from "./util/run";

export const kubernetesStartPullingData = () => dispatch => {
  setInterval(() => {
    dispatch(kubernetesData("get", "pods"));
  }, 5000);
};

// Flag to silence duplicate kubectl polling messages
let didSucceed = true;

export const kubernetesData = (action, resource) => dispatch => {
  return runKube(action, resource, "-o", "json")
    .then(output => {
      didSucceed = true;
      dispatch({
        type: KUBERNETES_DATA,
        output
      });
    })
    .catch(errorOutput => {
      if (didSucceed === true) {
        didSucceed = false;
        const message = `There was an error retrieving the kubernetes packages: ${errorOutput}`;
        dispatch(serverError(message));
      }
    });
};

export const kubernetesDeletePod = appName => dispatch => {
  return runKube("delete", "pod", appName);
};
