export const generateUid = () => {
  generateUid.counter++;
  return generateUid.counter;
};

generateUid.counter = 0;
