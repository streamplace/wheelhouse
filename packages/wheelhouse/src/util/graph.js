/**
 * Run something for each package in dependency order.
 */
export const pkgForEach = async (packages, cb, visited = new Set()) => {
  // umm. algorithm is: pick one at random, if we've handled its dependencies then do it, if we
  // can't then push it to the end.
  let packagesToVisit = Object.keys(packages);

  // Base case: we're done!
  if ([...visited].length >= packagesToVisit.length) {
    return;
  }

  const previouslyVisited = new Set([...visited]);
  const exec = [];

  // Outer loop: keep going until each package has run
  for (const pkgName of packagesToVisit) {
    if (previouslyVisited.has(pkgName)) {
      continue;
    }
    const pkg = packages[pkgName];
    const stop = pkg.localDependencies.some(dep => {
      return !previouslyVisited.has(dep);
    });
    if (stop) {
      continue;
    }
    visited.add(pkgName);
    exec.push(pkg);
    // Uncommenting this line makes everything run one at a time. Useful for debugging.
    // break;
  }

  await Promise.all(exec.map(async pkg => cb(pkg)));
  return pkgForEach(packages, cb, visited);
};
