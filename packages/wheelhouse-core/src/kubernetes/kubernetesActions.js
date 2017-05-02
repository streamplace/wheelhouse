// import { KUBERNETES_DATA } from "./kubernetesConstants";

export const kubernetesStartPullingData = () => dispatch => {
  setInterval(() => {dispatch(kubernetesData("get", "pods"));}, 5000);
};

export const kubernetesData = (action, resource) => dispatch => {
  const spawn = require("child_process").spawn;
  const ls = spawn("kubectl", [action, resource, "-o", "json"]);

  // let output = "";
  // let errorOutput = "";

  ls.stdout.on("data", (data) => {
    // output += data;
    // console.log(`stdout: ${output}`);
  });

  ls.stderr.on("data", (data) => {
    // errorOutput += data;
    // console.log(`stderr: ${errorOutput}`);
  });

  ls.on("close", (code) => dispatch => {
    // console.log(`output ${output}`);
    // dispatch({ KUBERNETES_DATA});
    //dispatch the redux action
    //if it exits with a code that's not zero, log the error
    // console.log(`child process exited with code ${code}`);
  });
};
