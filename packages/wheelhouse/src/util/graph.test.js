import streamplaceTestData from "wheelhouse-core/test/streamplace-test-data";
import { pkgForEach } from "./graph";

const briefWait = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 10);
  });
};

describe("pkgForEach", async () => {
  let packages;
  let touched;

  beforeEach(() => {
    packages = streamplaceTestData.packages;
    touched = {};
  });

  const run = async pkg => {
    if (touched[pkg.name]) {
      throw new Error(`Visited ${pkg.name} twice!`);
    }
    touched[pkg.name] = true;
  };

  it("should execute for all apps once", async () => {
    await pkgForEach(packages, run);
    expect(Object.keys(touched).sort()).toEqual(Object.keys(packages).sort());
  });

  it("should execute in the right order", async () => {
    const packagesTest = {
      concurrentDep1: {
        name: "concurrentDep1",
        localDependencies: []
      },
      concurrentDep2: {
        name: "concurrentDep2",
        localDependencies: []
      },
      concurrentDep3: {
        name: "concurrentDep3",
        localDependencies: []
      },
      app1: {
        name: "app1",
        localDependencies: [
          "concurrentDep1",
          "concurrentDep2",
          "concurrentDep3"
        ]
      },
      app2: {
        name: "app2",
        localDependencies: ["app1"]
      }
    };
    let advanceResolve;
    let advanceProm;
    const advance = () => {
      if (advanceResolve) {
        advanceResolve();
      }
      advanceProm = new Promise((resolve, reject) => {
        advanceResolve = resolve;
      });
    };
    advance();
    pkgForEach(packagesTest, async pkg => {
      run(pkg);
      await advanceProm;
    });
    await briefWait();
    expect(Object.keys(touched).sort()).toEqual([
      "concurrentDep1",
      "concurrentDep2",
      "concurrentDep3"
    ]);
    advance();
    await briefWait();
    expect(Object.keys(touched).sort()).toEqual([
      "app1",
      "concurrentDep1",
      "concurrentDep2",
      "concurrentDep3"
    ]);
    advance();
    await briefWait();
    expect(Object.keys(touched).sort()).toEqual([
      "app1",
      "app2",
      "concurrentDep1",
      "concurrentDep2",
      "concurrentDep3"
    ]);
    advance();
  });
});
