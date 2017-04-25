
export const updateActiveStatus = (packagesCopy, name) => {
  packagesCopy.forEach(copy => {
    if (copy.name === name) {
      copy.active = !copy.active; 
      if (copy.active) {
        copy.status = "STARTING";
        setTimeout(function(status){ status = "RUNNING"; }, 2000, copy.status);
      } else {
        copy.status = "STOPPED"; 
      }
    }
  }); 
  return packagesCopy; 
};
