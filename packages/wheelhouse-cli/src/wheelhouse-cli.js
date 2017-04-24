#!/usr/bin/env node
/*eslint-disable no-console*/

import yargs from "yargs"; 
import { build } from "wheelhouse-core";


export default function runCli(argv) {
  yargs
  .command("build", "build wheelhouse", function(yargs) {
    return yargs;
  }, function(argv) {
    build(); 
  })
  .help()
  .strict()
  .exitProcess(false)
  .parse(argv);
}

if (!module.parent) {
  runCli(process.argv);
}