const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const commonConfiguration = require("./webpack.common.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = merge(commonConfiguration, {
  mode: "production",
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 9000000,
    hints: false,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: true,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      systemvars: true,
    }),
  ],
});
