#!/usr/bin/env node
/*eslint-disable no-console*/

import yargs from "yargs";
import { store } from "./store";
import {
  wheelhouseInstall,
  wheelhouseLink,
  wheelhouseStart,
  wheelhouseBuild,
  wheelhouseSetVersion
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

const runCli = async function(argv) {
  yargs
    .command({
      command: "start [script..]",
      describe: "Run your local development with Wheelhouse",
      aliases: ["dev", "run"],
      builder: yargs => {
        return yargs.options({
          app: {
            alias: "a",
            type: "array",
            describe:
              "'wheelhouse start -a [my-app]' will boot this non-autorun app on startup"
          },
          "disable-kube": {
            type: "boolean",
            describe:
              "Disable Kubernetes polling. Try this if you're having performance issues."
          }
        });
      },
      handler: argv => {
        const script = argv.script.slice(2).join(" ");
        attemptAction(wheelhouseStart, {
          script: script,
          startApps: argv.app || [],
          disableKube: argv.disableKube
        });
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
      describe:
        "Use Wheelhouse to build your npm packages, Docker images, and Helm charts",
      handler: argv => {
        attemptAction(wheelhouseBuild);
      }
    })
    .command({
      command: "set-version [version-tag]",
      usage: "$0 set-version [version-tag]",
      describe:
        "Update the version numbers in all of your package.json and Chart.yaml files. defaults to $(git describe --tags)",
      handler: argv => {
        attemptAction(wheelhouseSetVersion(argv.versionTag));
      }
    })
    .help()
    .version()
    .exitProcess(false)
    .parse(argv.slice(2));
};

export default runCli;

if (!module.parent) {
  console.log("no parent");
  console.log(process.argv);
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
