// I'm a file that knows how to define the Package variable for parsing Meteor packages!

/*eslint-disable no-unused-vars*/

const PackageData = {
  describe: {},
  client: {
    files: [],
    assets: [],
    use: [],
    imply: [],
    exports: []
  },
  server: {
    files: [],
    assets: [],
    use: [],
    imply: [],
    exports: []
  },
  npm: {}
};

const Package = {
  describe: function(data, ...rest) {
    if (rest.length > 0) {
      throw new Error("Unknown extra argument to describe: " + rest);
    }
    PackageData.describe = data;
  },
  onUse: function(func, ...rest) {
    if (rest.length > 0) {
      throw new Error("Unknown extra argument to onUse: " + rest);
    }
    if (typeof func !== "function") {
      throw new Error("Unknown argument to onUse: " + func);
    }
    func(api);
  },
  onTest: function() {
    // We do not care about this quite yet.
  }
};

const Npm = {
  depends: function(obj, ...args) {
    PackageData.npm = {
      ...PackageData.npm,
      ...obj
    };
  }
};

const stringOrArray = function(param) {
  if (typeof param === "string") {
    param = [param];
  }
  if (!(param instanceof Array)) {
    throw new Error(
      `Got ${typeof param} expected string or array: ${JSON.stringify(param)}`
    );
  }
  return param;
};

const checkTargets = function(targets) {
  if (typeof targets === "undefined") {
    targets = ["client", "server"];
  }
  let client = false;
  let server = false;
  targets = stringOrArray(targets);
  targets.forEach(function(target) {
    if (target === "client") {
      client = true;
    } else if (target === "server") {
      server = true;
    } else {
      throw new Error(`Unknown target: ${target}`);
    }
  });
  return { client, server };
};

const api = {
  _addFilesAssets: function(field, files, targets, ...rest) {
    if (rest.length > 0) {
      throw new Error(`Unknown extra arguments to addFiles: ${rest}`);
    }
    const { client, server } = checkTargets(targets);
    files = stringOrArray(files);
    if (client) {
      PackageData.client[field].push(...files);
    }
    if (server) {
      PackageData.server[field].push(...files);
    }
  },

  addFiles: function(...args) {
    return api._addFilesAssets("files", ...args);
  },

  addAssets: function(...args) {
    return api._addFilesAssets("assets", ...args);
  },

  versionsFrom: function(version) {
    PackageData.versionsFrom = version;
  },

  export: function(str, targets, ...rest) {
    if (rest.length > 0) {
      throw new Error(`Unknown extra arguments to export: ${rest}`);
    }
    if (typeof str !== "string") {
      throw new Error(`Uknown argument to export: ${str}`);
    }
    const { client, server } = checkTargets(targets);
    if (client) {
      PackageData.client.exports.push(str);
    }
    if (server) {
      PackageData.server.exports.push(str);
    }
  },

  _useImply: function(field, dependencies, targets, ...rest) {
    let options;
    if (rest.length === 1) {
      options = rest[0];
    } else if (rest.length > 0) {
      throw new Error(
        `Unknown extra arguments to use: ${JSON.stringify(rest)}`
      );
    }
    if (typeof targets === "object" && !(targets instanceof Array)) {
      options = targets;
      targets = undefined;
    }
    if (!options) {
      options = {};
    }
    if (Object.keys(options).length > 1) {
      throw new Error(`Uknown options object: ${JSON.stringify(options)}`);
    } else if (Object.keys(options).length === 1) {
      if (options.weak !== true) {
        throw new Error(`Uknown options object: ${JSON.stringify(options)}`);
      }
    }
    const { client, server } = checkTargets(targets);
    dependencies = stringOrArray(dependencies);
    if (client) {
      PackageData.client[field].push(...dependencies);
    }
    if (server) {
      PackageData.server[field].push(...dependencies);
    }
  },

  use: function(...args) {
    return api._useImply("use", ...args);
  },

  imply: function(...args) {
    return api._useImply("imply", ...args);
  }
};

// Apparently there are a bunch of aliases.
Package.on_use = Package.onUse;
Package.on_test = Package.onTest;
api.add_files = api.addFiles;
