/**
 * This file is filled with helpers for running external processes. We do a lot of that in
 * Wheelhouse.
 */
import { resolve, dirname } from "path";
import { spawn } from "child_process";
import split from "split";

let runningProcs = [];

export const run = (cmd, args, opts = {}) => {
  const proc = spawn(cmd, args, {
    cwd: opts.cwd
  });

  const logStdout = opts.stdout || function() {};
  const logStderr = opts.stdout || function() {};

  runningProcs.push(proc);

  let stdout = "";
  let stderr = "";

  proc.stdout.pipe(split()).on("data", data => {
    stdout += data;
    if (data.trim() !== "") {
      logStdout(data);
    }
  });

  proc.stderr.pipe(split()).on("data", data => {
    stderr += data;
    if (data.trim() !== "") {
      logStderr(data);
    }
  });

  let dead = false;

  const prom = new Promise((resolve, reject) => {
    proc.on("close", code => {
      if (dead) {
        return;
      }
      dead = true;
      runningProcs = runningProcs.filter(p => p !== proc);
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(stderr);
      }
    });
  });

  // A bit hacky, but we provide "exit" on these handles so they can be terminated by whoever
  // requested them. What's a better way to handle this? Perhaps opaque tokens that get passed back
  // to this module, in the same style as setTimeout?
  prom.exit = function() {
    if (dead) {
      return;
    }
    dead = true;
    proc.kill("KILL");
  };

  return prom;
};

process.on("SIGTERM", () => {
  runningProcs.forEach(proc => proc.kill("KILL"));
});

export const runKube = (...args) => {
  const kubePath = resolve(dirname(require.resolve("kubectl-cli")), "kubectl");
  return run(kubePath, args).then(data => {
    return JSON.parse(data);
  });
};
