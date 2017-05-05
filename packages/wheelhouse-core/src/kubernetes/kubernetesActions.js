import { KUBERNETES_DATA } from "./kubernetesConstants";
import { resolve, dirname } from "path";
// import { runKube } from "../util/processHelpers.js"

export const kubernetesStartPullingData = () => dispatch => {
  setInterval(() => {
    dispatch(kubernetesData("get", "pods"));
  }, 5000);
};

export const kubernetesData = (action, resource) => dispatch => {
  const spawn = require("child_process").spawn;
  const kubectlPath = resolve(
    dirname(require.resolve("kubectl-cli")),
    "kubectl"
  );
  const kubectl = spawn(kubectlPath, [action, resource, "-o", "json"]);

  let output = "";
  let errorOutput = "";

  kubectl.stdout.on("data", data => {
    output += data;
  });

  kubectl.stderr.on("data", data => {
    errorOutput += data;
  });

  /*eslint-disable no-console*/
  kubectl.on("close", code => {
    output = JSON.parse(output);
    dispatch({
      type: KUBERNETES_DATA,
      output
    });
    if (code !== 0) {
      console.error("errored output", errorOutput);
    }
  });
};

export const kubernetesDeletePod = appName => dispatch => {
  const spawn = require("child_process").spawn;
  const kubectlDelete = spawn("kubectl", ["delete", "pod", appName]);

  kubectlDelete.stdout.on("data", data => {
    console.log("stdout data:", data);
  });

  kubectlDelete.stderr.on("data", data => {
    console.log("stderr data:", data);
  });
  /*eslint-disable no-console*/
  kubectlDelete.on("close", code => {
    console.log(`closing with code ${code}`);
  });
  // return runKube("delete", "pod", appName);
};

// we are in the helper file now!

// let runningProcs = [];

// export function run(...args)

// //abstracted child-process
// export function runKube(...args) {
//   const kubeProc = spawn("kubectl", args);
//   runningProcs.push(kubeProc);

//   // stdout, stderr, etc...
//   kubeProc.stdOut.on /// etc...

//   return new Promise((resolve, reject) => {
//     kubeProc.on("close", (code) => {es.fi
//       resolve();
//       runningProcs = runningProcs.filter(p => p !== kubeProc);
//     })

//   })
// }

// //sigterm only runs if user hits ctrl c
// process.on("SIGTERM", () => {
//   runningProcs.forEach(proc => proc.kill("KILL"));
// })
