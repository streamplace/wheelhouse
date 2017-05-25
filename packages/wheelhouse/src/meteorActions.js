import fs from "fs-extra";
import Sandbox from "sandbox";
import { resolve, dirname } from "path";
import { developmentLog } from "./developmentActions";
import { globDirs } from "./util/globDirs";
import { transform } from "babel-core";
import { run } from "./util/run";
import semver from "semver";
import { METEOR_PACKAGE_LOADED, DEVELOPMENT_ENV_CHANGE } from "wheelhouse-core";
import prettier from "prettier";

// Regex for determining if a file in a meteor package was in the .npm directory
const localNpmRe = /^\.npm\/package\/node_modules\//;

/**
 * Rewrite a Meteor `.npm` path to a proper american node_modules path
 */
const rewriteNpmPath = meteorPath => {
  return meteorPath.replace(localNpmRe, "node_modules/");
};

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
  const pkgName = await dispatch(meteorReadPackageJs(myDir));
  const { outputDir, path, packageJs } = getState().meteor.packages[pkgName];
  const pkgJsonPath = resolve(path, "package.json");
  dispatch(developmentLog(pkgName, "creating package.json"));
  const dependencies = {};
  // Add in ^ in front of package versions, Meteor uses exact. Unless it's an http url or whatever.
  for (const depName of Object.keys(packageJs.npm)) {
    if (semver.valid(packageJs.npm[depName])) {
      dependencies[depName] = `^${packageJs.npm[depName]}`;
    }
  }
  const pkgJsonData = {
    name: pkgName,
    description: packageJs.describe.summary,
    version: packageJs.describe.version,
    repository: packageJs.describe.git,
    dependencies
  };
  await fs.ensureDir(resolve(outputDir));
  await fs.writeFile(pkgJsonPath, JSON.stringify(pkgJsonData, null, 2), "utf8");

  await run("npm5", ["install"], {
    stdout: line => dispatch(developmentLog(pkgName, line)),
    stderr: line => dispatch(developmentLog(pkgName, line)),
    cwd: path
  });
  await fs.ensureDir(resolve(outputDir, "node_modules"));
  // Symlink to directory where Meteor expects packages
  await fs.ensureSymlink(
    resolve(outputDir, "node_modules"),
    resolve(myDir, "node_modules")
  );
  // const packageLockPath = resolve(outputDir, "package-lock.json");
  // if (await fs.pathExists(packageLockPath)) {
  //   await fs.copy(
  //     resolve(outputDir, "package-lock.json"),
  //     resolve(outputDir, ".npm", "package", "npm-shrinkwrap.json")
  //   );
  // }

  const assets = [
    ...new Set([...packageJs.server.assets, ...packageJs.client.assets])
  ];

  for (let asset of assets) {
    asset = rewriteNpmPath(asset);
    await fs.copy(resolve(myDir, asset), resolve(outputDir, asset));
  }

  // Compile all server files with babel
  const proms = [];
  const compileFiles = new Set([...packageJs.server.files]);
  for (let inputFile of [...compileFiles]) {
    if (localNpmRe.test(inputFile)) {
      inputFile = resolve(
        myDir,
        "node_modules",
        inputFile.replace(localNpmRe, "")
      );
    }
    // If it's a reference to meteor's local npm, rewrite it to a node_moduiles ref
    const inPath = resolve(myDir, inputFile);
    const outPath = resolve(outputDir, inputFile);
    proms.push(dispatch(meteorTransformFile(inPath, outPath)));
  }

  await Promise.all(proms);

  const clientLines = packageJs.client.files.map(file => {
    if (localNpmRe.test(file)) {
      // If it's a reference to meteor's local npm, rewrite it to a node_moduiles ref
      file = file.replace(localNpmRe, "");
    } else {
      // Otherwise, treat it as a local file
      file = `./${file}`;
    }
    return `import '${file}';`;
  });
  const clientFilePath = resolve(myDir, ".wh-client-build.js");
  await fs.writeFile(clientFilePath, clientLines.join("\n"), "utf8");
  await run(
    resolve(__dirname, "..", "node_modules", ".bin", "webpack"),
    [
      "--config",
      resolve(__dirname, "meteor-build.webpack-config.js"),
      "--entry",
      resolve(clientFilePath),
      "--context",
      outputDir,
      "--output-filename",
      "client-compiled.js",
      "--output-path",
      outputDir
    ],
    {
      cwd: outputDir,
      stdout: line => dispatch(developmentLog(pkgName, line)),
      stderr: line => dispatch(developmentLog(pkgName, line)),
      // Can't control this option over the webpack CLI, aargh. So we put it in an env var here that's also in `meteor-build.webpack.js`
      env: {
        WH_NODE_MODULES: resolve(outputDir, "node_modules")
      }
    }
  );
  await dispatch(meteorWritePackageJs(pkgName));
};

let loader;
let loaderDone;

export const meteorReadPackageJs = myDir => async (dispatch, getState) => {
  if (!loader) {
    loader = await fs.readFile(resolve(__dirname, "util", "packageLoader.js"));
  }
  if (!loaderDone) {
    loaderDone = await fs.readFile(
      resolve(__dirname, "util", "packageLoaderDone.js")
    );
  }
  const data = await fs.readFile(resolve(myDir, "package.js"), "utf8");
  const jsStr = [loader, data, loaderDone].join("\n");
  const packageData = await runSandbox(jsStr);
  const [org, meteorName] = packageData.describe.name.split(":");
  const pkgName = `@${org}/${meteorName}`;
  dispatch({
    type: METEOR_PACKAGE_LOADED,
    pkgName,
    packageJs: packageData,
    path: myDir
  });
  const outputDir = getState().meteor.packages[pkgName].outputDir;
  const rootDir = getState().config.rootDir;
  // Create a symlink to our compiled package in the meteor_packages directory
  await fs.ensureDir(resolve(rootDir, ".wh-build", "meteor_packages"));
  await fs.ensureSymlink(
    outputDir,
    resolve(rootDir, ".wh-build", "meteor_packages", meteorName)
  );
  dispatch({
    type: DEVELOPMENT_ENV_CHANGE,
    variableName: "METEOR_PACKAGE_DIRS",
    currentValue: resolve(rootDir, ".wh-build", "meteor_packages")
  });
  return pkgName;
};

const PACKAGE_BLACKLIST = ["ecmascript", "scss"];

export const meteorWritePackageJs = pkgName => async (dispatch, getState) => {
  const { outputDir, packageJs } = getState().meteor.packages[pkgName];
  const outputPath = resolve(outputDir, "package.js");
  const data = [];
  data.push("// This file generated by wheelhouse. Don't manually edit.");
  const json = data => JSON.stringify(data, null, 2);
  data.push(`Package.describe(${json(packageJs.describe)})`);
  const onUse = [];
  onUse.push("// Webpack-compiled template files");
  // onUse.push("api.addFiles('wh-compiled.js', 'client')");
  ["server", "client"].forEach(target => {
    // const files = packageJs[target].files.filter(file => !webpackHandled(file));
    const use = packageJs[target].use.filter(
      pkg => !PACKAGE_BLACKLIST.includes(pkg)
    );
    const imply = packageJs[target].imply.filter(
      pkg => !PACKAGE_BLACKLIST.includes(pkg)
    );
    const assets = packageJs[target].assets.map(rewriteNpmPath);
    onUse.push(`api.use(${json(use)}, "${target}")`);
    onUse.push(`api.imply(${json(imply)}, "${target}")`);
    onUse.push(`api.addAssets(${json(assets)}, "${target}")`);
    // onUse.push(`api.addFiles(${json(files)}, "${target}")`);
  });
  // onUse.push(`Npm.depends(${json(packageJs.npm)})`);
  data.push(`Package.onUse(function(api) {
    ${onUse.join("\n")}
  });`);
  dispatch(developmentLog(pkgName, "writing package.js"));
  await fs.writeFile(outputPath, prettier.format(data.join("\n")), "utf8");
  const serverData = packageJs.server.files
    .map(file => `require("./${file}");`)
    .join("\n");
  await fs.writeFile(
    resolve(outputDir, "server-compiled.js"),
    prettier.format(serverData),
    "utf8"
  );
};

export const meteorTransformFile = (file, outputFile) => async () => {
  const inputData = await fs.readFile(file, "utf8");
  const result = transform(inputData, {
    presets: [require("babel-preset-streamplace")]
  });
  await fs.ensureDir(dirname(outputFile));
  await fs.writeFile(outputFile, result.code, "utf8");
};
