#!/usr/bin/env node
/*eslint-disable no-console*/

import yargs from "yargs";
import { store } from "wheelhouse-core/dist/store";
import {developmentStart} from "wheelhouse-core/dist/development/developmentActions";

const attemptAction = async function(action, ...args) {
  try {
    await store.dispatch(action(...args));
  }
  catch (e) {
    console.error("Fatal error!");
    console.error(e);
  }
};

if (!global._babelPolyfill) {
  require("babel-polyfill");
}

const runCli = async function(argv) {
  yargs
    // .command("build", "build wheelhouse", yargs => yargs
    // , function(argv) {
    //   attemptAction(configLoad);
    // })
  // dev
  .command({
    command: "dev",
    describe: "Run your local development with Wheelhouse",
    handler: (argv) => {
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
  runCli(process.argv).catch((err) => {
    console.error(err);
  });
}
