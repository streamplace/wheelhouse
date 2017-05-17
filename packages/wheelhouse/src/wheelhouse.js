#!/usr/bin/env node
/*eslint-disable no-console*/

import yargs from "yargs";
import { store } from "./store";
import {
  developmentStart,
  developmentBuild,
  developmentInstall
} from "./developmentActions";

const attemptAction = async function(action, ...args) {
  try {
    await store.dispatch(action(...args));
  } catch (e) {
    console.error("Fatal error!");
    console.error(e);
    process.exit(1);
  }
};

if (!global._babelPolyfill) {
  require("babel-polyfill");
}

//make wheelhouse-lint command
const runCli = async function(argv) {
  yargs
    .command({
      command: "dev",
      describe: "Run your local development with Wheelhouse",
      handler: argv => {
        attemptAction(developmentStart);
      }
    })
    .command({
      command: "build",
      describe: "Build your app!",
      handler: argv => {
        attemptAction(developmentBuild);
      }
    })
    .command({
      command: "install",
      describe: "install all necessary dependencies in all packages",
      handler: argv => {
        attemptAction(developmentInstall);
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
