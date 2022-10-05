const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.common.js");
const portFinderSync = require("portfinder-sync");
const path = require("path");

module.exports = merge(commonConfiguration, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: { directory: path.join(__dirname, "./dist") },
    compress: true,
    hot: true,
    port: portFinderSync.getPort(3000),
  },
});
