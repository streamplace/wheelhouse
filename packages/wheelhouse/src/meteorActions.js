import { configLoad } from "./configActions";
import fs from "fs-extra";
import Sandbox from "sandbox";
import { resolve, dirname } from "path";
import { developmentLog } from "./developmentActions";
import { globDirs } from "./util/globDirs";
import { transform } from "babel-core";

const runSandbox = jsStr => {
  const sandbox = new Sandbox();
  return new Promise((resolve, reject) => {
    sandbox.run(jsStr, function(output) {
      if (output.result !== "null") {
        reject(new Error(`Error while parsing package.js: ${output.result}`));
      }
      let data;
      try {
        data = JSON.parse(output.console);
      } catch (e) {
        reject(`Got non-JSON data from package.js: ${output.console}`);
      }
      resolve(data);
    });
  });
};

export const meteorLoadPackages = () => async (dispatch, getState) => {
  const meteorPackageGlob = getState().config.meteorPackages;
  const meteorPackages = await dispatch(globDirs(meteorPackageGlob));
  for (const pkgDir of meteorPackages) {
    await dispatch(meteorPackageBuild(pkgDir));
  }
};

export const meteorPackageBuild = myDir => async (dispatch, getState) => {
  const loader = await fs.readFile(
    resolve(__dirname, "util", "packageLoader.js")
  );
  const loaderDone = await fs.readFile(
    resolve(__dirname, "util", "packageLoaderDone.js")
  );
  const data = await fs.readFile(resolve(myDir, "package.js"), "utf8");
  const jsStr = [loader, data, loaderDone].join("\n");
  const packageData = await runSandbox(jsStr);
  const [org, meteorName] = packageData.describe.name.split(":");
  const pkgName = `@${org}/${meteorName}`;
  const rootDir = getState().config.rootDir;
  const outputDir = resolve(rootDir, "compiled_packages", meteorName);
  await fs.ensureDir(outputDir);
  const pkgJsonPath = resolve(outputDir, "package.json");
  dispatch(developmentLog(pkgName, "creating package.json"));
  const dependencies = {};
  // Add in ^ in front of package versions, Meteor uses exact
  for (const depName of Object.keys(packageData.npm)) {
    dependencies[depName] = `^${packageData.npm[depName]}`;
  }
  const pkgJsonData = {
    name: pkgName,
    description: packageData.describe.summary,
    version: packageData.describe.version,
    repository: packageData.describe.git,
    dependencies
  };
  await fs.writeFile(pkgJsonPath, JSON.stringify(pkgJsonData, null, 2), "utf8");

  // Compile all server files with babel
  const proms = [];
  for (const inputFile of packageData.server.files) {
    const inPath = resolve(myDir, inputFile);
    const outPath = resolve(outputDir, inputFile);
    proms.push(dispatch(meteorTransformFile(inPath, outPath)));
  }
  await Promise.all(proms);
};

export const meteorTransformFile = (file, outputFile) => async () => {
  const inputData = await fs.readFile(file, "utf8");
  const result = transform(inputData, {
    presets: [require("babel-preset-streamplace")]
  });
  await fs.ensureDir(dirname(outputFile));
  await fs.writeFile(outputFile, result.code, "utf8");
};

// console.log(packageData);
