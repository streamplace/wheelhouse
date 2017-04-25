
jest.mock("wheelhouse-core");

import core from "wheelhouse-core";
import runCli from "./wheelhouse-cli";

const run = (str) => {
  return runCli([].concat(str.split(" ").filter(s => !!s)));
};

describe("wheelhouse-cli", function() {

  beforeEach(function() {
    core.build.mockClear();
  });

  describe("wheelhouse build", function() {

    it("should run the build command properly", function() {
      run("build");
      expect(core.build).toBeCalled();
    });

    it("should not run the build command if we don't tell it to build", function() {
      run("");
      expect(core.build).not.toBeCalled();
    });

    it("should reject unknown commands", function() {
      expect(() => run("beep beep bloop")).toThrow();

      let errored = false;
      try {
        run("beep beep bloop");
      }
      catch(e) {
        errored = true;
      }
      expect(errored).toBe(true);
    });

    it("should have wheelhouse build --help", function() {
      expect(() => run("--help")).not.toThrow();

      run("build --help");
      expect(core.build).not.toBeCalled();
    });

  });

});
