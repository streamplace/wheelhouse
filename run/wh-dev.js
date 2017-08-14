#!/usr/bin/env node
/* eslint-disable no-console */

// This is the wrapper around the `wh-dev` script we use for development. It
// auto-restarts wheelhouse commands if the code changes. This file doesn't get
// transpiled, so it should be executable by vanilla node 4.

/** Commands that we want to auto-reboot-on-changes */
const STAY_RUNNING = ["start", "run", "dev"];
const stayRunning = STAY_RUNNING.includes(process.argv[2]);

const axios = require("axios");
const resolve = require("path").resolve;
const nodemon = require("nodemon");
const debug = require("debug");
const realpath = require("fs").realpathSync;
const spawnSync = require("child_process").spawnSync;

const log = debug("wheelhouse:wh-dev");

const fail = () => {
  console.error(
    `couldn't find wheelhouse dev server at localhost:3942. Is
     \`npm run dev\` running?`
  );
  process.exit(1);
};

// There's no circumstances where localhost takes a second, right?
const handle = setTimeout(fail, 1000);

let closing = false;

axios.get("http://localhost:3942").catch(fail).then(() => {
  clearTimeout(handle);
  const whRoot = realpath(resolve(__dirname, ".."));
  const whExec = realpath(
    resolve(whRoot, "packages", "wheelhouse", "dist", "wheelhouse.js")
  );

  if (!stayRunning) {
    const { code } = spawnSync(whExec, process.argv.slice(2), {
      env: Object.assign({ WH_LOCAL_DEV: "true" }, process.env),
      stdio: "inherit"
    });
    process.exit(code);
  }

  nodemon({
    script: whExec,
    args: process.argv.slice(2),
    watch: [
      resolve(whRoot, "packages", "wheelhouse", "dist"),
      resolve(whRoot, "packages", "wheelhouse-core", "dist")
    ],
    env: {
      WH_LOCAL_DEV: "true"
    }
  })
    .on("start", function() {
      log("start");
    })
    .on("quit", function(code) {
      if (closing) {
        process.exit(0);
        return;
      }
      console.error("wheelhouse crashed");
      if (!stayRunning) {
        process.exit(1);
      } else {
        console.error("Waiting for changes");
      }
    })
    .on("exit", function() {
      if (closing) {
        process.exit(0);
        return;
      }
      console.error("wheelhouse exited cleanly");
      if (!stayRunning) {
        process.exit(0);
      } else {
        console.error("Waiting for changes");
      }
    })
    .on("restart", function(files) {
      console.error("App restarted due to: ", files);
    });
});

const cleanup = () => {
  console.error("Exiting...");
  closing = true;
  nodemon.emit("quit");
};

process.on("SIGTERM", cleanup);
process.on("SIGINT", cleanup);
