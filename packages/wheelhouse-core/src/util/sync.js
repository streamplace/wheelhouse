export const outOfSync = packages => {
  let packagesOutOfSync = [];
  for (let key in packages) {
    if (packages[key].chartYaml) {
      let object = {};
      if (
        packages[key].chartYaml.name !== packages[key].packageJson.name ||
        packages[key].chartYaml.description !==
          packages[key].packageJson.description ||
        packages[key].chartYaml.version !== packages[key].packageJson.version
      ) {
        object[key] = true;
        packagesOutOfSync.push(object);
      } else {
        object[key] = false;
        packagesOutOfSync.push(object);
      }
    }
  }

  return packagesOutOfSync;
};

export const addLintingErrorStatuses = (errorStatuses, state) => {
  errorStatuses.forEach(status => {
    let key = Object.keys(status)[0];
    if (Object.values(status)[0]) {
      state[key].lintingError = true;
    } else {
      state[key].lintingError = false;
    }
  });
};
