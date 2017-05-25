const path = require("path");
const webpack = require("webpack");

// Helper function to resolve loaders relative to WH rather than the building app
const loader = name => {
  return path.resolve(__dirname, "..", "node_modules", `${name}-loader`);
};

module.exports = {
  entry: "./.wh-client-build.js",
  plugins: [
    new webpack.DefinePlugin({
      "Meteor.isClient": JSON.stringify(true),
      "Meteor.isServer": JSON.stringify(false),
      // Disable amd support. Silly workaround for https://github.com/collab-project/videojs-wavesurfer/issues/30
      "define.amd": JSON.stringify(false)
    })
  ],
  externals: /^meteor/g,
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: loader("spacebars")
      },
      {
        test: /\.scss$/,
        loaders: [
          loader("style"),
          loader("css"),
          loader("sass"),
          `${loader("string-replace")}?search={csats:tealtown}&replace=/Volumes/elidev/csats/apps/custom_packages/tealtown&flags=gi`
        ]
      },
      {
        test: /\.css$/,
        loaders: [loader("style"), loader("css")]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: `${loader("url")}?limit=10000&minetype=application/font-woff`
      },
      {
        test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: loader("file")
      }
    ]
  },
  resolve: {}
};
