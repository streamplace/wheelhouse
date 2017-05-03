
export const updateActiveStatus = (packagesCopy, name) => {
  packagesCopy.forEach(copy => {
    if (copy.name === name) {
      copy.active = !copy.active;
      if (copy.active) {
        copy.status = "STARTING";
        setTimeout(function(status) { return function() { copy.status = "RUNNING"; }; }(copy.status), 1000);
      } else {
        copy.status = "STOPPED";
      }
    }
  });
  return packagesCopy;
};
