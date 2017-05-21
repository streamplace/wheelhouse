import { configLoad } from "./configActions";
import fs from "fs-extra";
import Sandbox from "sandbox";
import { resolve } from "path";
import { developmentLog } from "./developmentActions";

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

export const meteorPackageBuild = () => async (dispatch, getState) => {
  await dispatch(configLoad());
  const myDir = process.cwd();
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
};

// console.log(packageData);
