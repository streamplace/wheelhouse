
if (!global._babelPolyfill) {
  require("babel-polyfill");
}

export * from "./config/configConstants";
export * from "./server/serverConstants";
export { default as reducer } from "./reducer";
