#!/usr/bin/env node
/*eslint-disable no-console*/

import yargs from "yargs";
import { store } from "./store";
import {
  developmentStart,
  developmentBuild,
  developmentInstall,
  developmentMeteorPackageBuild
} from "./developmentActions";
import debug from "debug";
import { resolve } from "path";

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
  // If they do "wheelhouse run" we want all of the following arguments to be passed to the script
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
        attemptAction(developmentStart, script);
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
      command: "meteor",
      describe: "Meteor-related commands",
      builder: yargs => {
        yargs.command({
          command: "build-package <pkg-name>",
          describe: "build a Meteor package",
          handler: argv => {
            attemptAction(developmentMeteorPackageBuild, resolve(argv._[3]));
          }
        });
        yargs.help();
      },
      handler: argv => {
        yargs.showHelp();
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
    // .strict()
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
