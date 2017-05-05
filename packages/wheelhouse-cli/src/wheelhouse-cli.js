#!/usr/bin/env node
/*eslint-disable no-console*/

import yargs from "yargs";
import { store } from "./store";
import { developmentStart } from "./developmentActions";

const attemptAction = async function(action, ...args) {
  try {
    await store.dispatch(action(...args));
  } catch (e) {
    console.error("Fatal error!");
    console.error(e);
  }
};

if (!global._babelPolyfill) {
  require("babel-polyfill");
}

const runCli = async function(argv) {
  yargs
    .command({
      command: "dev",
      describe: "Run your local development with Wheelhouse",
      handler: argv => {
        attemptAction(developmentStart);
      }
    })
    .help()
    .strict()
    .exitProcess(false)
    .parse(argv);
};

export default runCli;

if (!module.parent) {
  runCli(process.argv).catch(err => {
    console.error(err);
  });
}

// Make unhandled promise rejections fatal
process.on("unhandledRejection", function(reason, p) {
  console.log("Unhandled promise rejection, exiting. Details:");
  console.log(reason);
  process.exit(1);
  // application specific logging here
});
