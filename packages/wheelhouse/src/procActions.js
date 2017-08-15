import { run } from "./util/run";
import { developmentLog } from "./developmentActions";
import { basename } from "path";

/**
 * Preferred way to execute other applications from Wheelhouse, which is
 * something we do a whole lot. Calling `run` from ./util/run is deprecated.
 * @param {String} program
 * @param {Array} args
 * @param {Object} opts
 */

export const procRun = (prog, args, opts = {}) => async dispatch => {
  const wd = opts.cwd || process.cwd();
  const name = opts.name || basename(wd);
  dispatch(developmentLog(name, `> ${prog} ${args.join(" ")}`));
  opts = {
    stdout: line => dispatch(developmentLog(name, line)),
    stderr: line => dispatch(developmentLog(name, line)),
    ...opts
  };
  return await run(prog, args, opts);
};
