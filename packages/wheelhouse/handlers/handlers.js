/*eslint-disable no-console*/

let runningProcs = [];
console.log("RUNNING PROCS", runningProcs);
// export function run(...args)

//abstracted child-process
export function runKube(...args) {
  const spawn = require("child_process").spawn;
  const kubeProc = spawn("kubectl", args);
  runningProcs.push(kubeProc);

  kubeProc.stdout.on("data", data => {
    console.log("stdout data:", data);
  });

  kubeProc.stderr.on("data", data => {
    console.log("stderr data:", data);
  });
  // stdout, stderr, etc...
  // kubeProc.stdOut.on; /// etc...

  return new Promise((resolve, reject) => {
    kubeProc.on("close", code => {
      // es.fi;
      resolve();
      runningProcs = runningProcs.filter(p => p !== kubeProc);
    });
  });
}

//sigterm only runs if user hits ctrl c
process.on("SIGTERM", () => {
  runningProcs.forEach(proc => proc.kill("KILL"));
});
