import { KUBERNETES_DATA } from "./kubernetesConstants";

export const kubernetesStartPullingData = () => dispatch => {
  setInterval(() => {dispatch(kubernetesData("get", "pods"));}, 5000);
};

export const kubernetesData = (action, resource) => dispatch => {
  const spawn = require("child_process").spawn;
  const kubectl = spawn("kubectl", [action, resource, "-o", "json"]);

  let output = "";
  let errorOutput = "";

  kubectl.stdout.on("data", (data) => {
    output += data;
  });

  kubectl.stderr.on("data", (data) => {
    errorOutput += data;
  });

  /*eslint-disable no-console*/
  kubectl.on("close", (code) => {
    output = JSON.parse(output);
    dispatch({ type: KUBERNETES_DATA, output });
    if (code !== 0) {
      console.error("errored output", errorOutput);
    }
  });
};

