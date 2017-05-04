export const hashCode = str => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export const _makeBrighter = hex => {
  hex = hex.split("");
  hex[1] = "F";
  return hex.join("");
};

export const intToRGB = i => {
  var offLimits = /[0-9a-e]/gi;
  var c = (i & 0x00ffffff).toString(16).toUpperCase();
  c = "#" + "00000".substring(0, 6 - c.length) + c;
  return c[1].match(offLimits) ? _makeBrighter(c) : c;
};

const colors = {};

export const getColor = pkgName => {
  if (!colors[pkgName]) {
    const code = hashCode(pkgName);
    colors[pkgName] = intToRGB(code);
  }
  return colors[pkgName];
};
