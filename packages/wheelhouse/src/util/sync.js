export const outOfSync = packages => {
  let outOfSyncPackages = "";
  for (let key in packages) {
    if (packages[key].chartYaml) {
      if (
        packages[key].chartYaml.name !== packages[key].packageJson.name ||
        packages[key].chartYaml.description !==
          packages[key].packageJson.description ||
        packages[key].chartYaml.version !== packages[key].packageJson.version
      ) {
        outOfSyncPackages += ` ${key} `;
      }
    }
  }
  return outOfSyncPackages;
};
