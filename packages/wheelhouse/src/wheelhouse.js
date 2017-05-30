#!/usr/bin/env node
/*eslint-disable no-console*/

import yargs from "yargs";
import { store } from "./store";
import {
  wheelhouseInstall,
  wheelhouseLink,
  wheelhouseStart,
  wheelhouseBuild
} from "./wheelhouseActions";
import debug from "debug";

const log = debug("wheelhouse:cli");

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

const runCli = async function(inputArgv) {
  // #hack for C-SATS run/stage script
  const argv = [];
  while (inputArgv.length > 0) {
    const str = inputArgv.shift();
    argv.push(str);
    if (str === "run") {
      break;
    }
  }
  const script = inputArgv.join(" ");

  yargs
    .command({
      command: "run",
      describe: "Run your local development with Wheelhouse",
      aliases: "dev",
      handler: argv => {
        attemptAction(wheelhouseStart, script);
      }
    })
    .command({
      command: "install",
      describe: "install all necessary dependencies of all packages",
      handler: argv => {
        attemptAction(wheelhouseInstall);
      }
    })
    .command({
      command: "link",
      describe: "Run your local development with Wheelhouse",
      aliases: "dev",
      handler: argv => {
        attemptAction(wheelhouseLink);
      }
    })
    .command({
      command: "build",
      describe: "Use Wheelhouse to build your npm packages, Docker images, and Helm charts",
      handler: argv => {
        attemptAction(wheelhouseBuild);
      }
    })
    .help()
    .version()
    .exitProcess(false)
    .parse(argv);
};

export default runCli;

if (!module.parent) {
  runCli(process.argv).catch(err => {
    log(err);
  });
}

// Make unhandled promise rejections fatal
process.on("unhandledRejection", function(reason, p) {
  console.log("Unhandled promise rejection. Details:");
  console.log(reason);
  // Commented for now as it appears to be mucking with child processes
  // process.exit(1);
  // application specific logging here
});
