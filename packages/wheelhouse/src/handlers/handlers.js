/*eslint-disable no-console*/

let runningProcs = [];
console.log("RUNNING PROCS", runningProcs);
// export function run(cmd, ...args)

export const runKube = (...args) => {
  const spawn = require("child_process").spawn;
  const kubeProc = spawn("kubectl", args);
  runningProcs.push(kubeProc);

  let output = "";
  let errorOutput = "";

  kubeProc.stdout.on("data", data => {
    output += data;
  });

  kubeProc.stderr.on("data", data => {
    errorOutput += data;
  });

  const prom = new Promise((resolve, reject) => {
    kubeProc.on("close", code => {
      runningProcs = runningProcs.filter(p => p !== kubeProc);
      if (code === 0) {
        resolve(output);
      } else {
        reject(errorOutput);
      }
    });
  });

  prom.exit = function() {
    kubeProc.kill("KILL");
  };

  return prom;
};

process.on("SIGTERM", () => {
  runningProcs.forEach(proc => proc.kill("KILL"));
});
