import { KUBERNETES_DATA } from "./kubernetesConstants";
import { resolve, dirname } from "path";

export const kubernetesStartPullingData = () => dispatch => {
  setInterval(() => {dispatch(kubernetesData("get", "pods"));}, 5000);
};

export const kubernetesData = (action, resource) => dispatch => {
  const spawn = require("child_process").spawn;
  const kubectlPath = resolve(dirname(require.resolve("kubectl-cli")), "kubectl");
  const kubectl = spawn(kubectlPath, [action, resource, "-o", "json"]);

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
    dispatch({ type: KUBERNETES_DATA,
      output });
    if (code !== 0) {
      console.error("errored output", errorOutput);
    }
  });

};

export const kubernetesDeletePod = (appName) => {
  const spawn = require("child_process").spawn;
  const kubectlDelete = spawn("kubectl", ["delete", "pod", appName]);

  kubectlDelete.stdout.on("data", (data) => {
    console.log("stdout data:", data);
  });

  kubectlDelete.stderr.on("data", (data) => {
    console.log("stderr data:", data);
  });

  /*eslint-disable no-console*/
  kubectlDelete.on("close", (code) => {
    console.log(`closing with code ${code}`);
  });

};


