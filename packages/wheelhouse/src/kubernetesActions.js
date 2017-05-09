import { KUBERNETES_DATA } from "wheelhouse-core";
import { serverError } from "./serverActions";
// import { resolve, dirname } from "path";
import { runKube } from "./handlers/handlers";

export const kubernetesStartPullingData = () => dispatch => {
  setInterval(() => {
    dispatch(kubernetesData("get", "pods"));
  }, 5000);
};

export const kubernetesData = (action, resource) => dispatch => {
  return runKube(action, resource, "-o", "json")
    .then(output => {
      output = JSON.parse(output);
      dispatch({
        type: KUBERNETES_DATA,
        output
      });
    })
    .catch(errorOutput => {
      const message = `There was an error retrieving the kubernetes packages: ${errorOutput}`;
      dispatch(serverError(message));
    });
};

export const kubernetesDeletePod = appName => dispatch => {
  return runKube("delete", "pod", appName);
};
