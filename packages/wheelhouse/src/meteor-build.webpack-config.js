const path = require("path");
const webpack = require("webpack");

// Helper function to resolve loaders relative to WH rather than the building app
const loader = name => {
  return path.resolve(__dirname, "..", "node_modules", `${name}-loader`);
};

module.exports = {
  entry: "./.wh-client-build.js",
  output: {
    filename: ".wh-client-built.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "Meteor.isClient": JSON.stringify(true),
      "Meteor.isServer": JSON.stringify(false)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: loader("spacebars")
      },
      {
        test: /\.scss$/,
        loader: [`${loader("file")}?name=[name].scss`]
      },
      {
        test: /\.css$/,
        loader: [`${loader("file")}?name=[name].css`]
      }
    ]
  }
};
