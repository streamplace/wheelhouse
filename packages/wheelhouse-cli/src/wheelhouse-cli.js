#!/usr/bin/env node
/*eslint-disable no-console*/

import yargs from "yargs";
import {
  store,
  configLoad,
} from "wheelhouse-core";

const attemptAction = async function(action, ...args) {
  try {
    await store.dispatch(action(...args));
  }
  catch (e) {
    console.error("Fatal error!");
    console.error(e);
  }
};

const runCli = async function(argv) {
  yargs
  .command("build", "build wheelhouse", function(yargs) {
    return yargs;
  }, function(argv) {
    attemptAction(configLoad);
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
