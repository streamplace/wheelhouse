
export const updateActiveStatus = (packagesCopy, name) => {
  packagesCopy.forEach(copy => {
    if (copy.name === name) {
      copy.active = !copy.active; 
    }
  }); 
  return packagesCopy; 
};