const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    popup: path.join(__dirname, "src", "popup.js"),
    background: path.join(__dirname, "src", "background.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "./src/popup.html",
      chunks: ["popup"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/assets/images", to: "./assets/images" },
        {
          from: "./src/_locales",
          to: "./_locales",
        },
        {
          from: "./src/manifest.json",
          to: "./manifest.json",
        },
      ],
    }),
  ],
  optimization: {
    minimize: false,
  },
};
