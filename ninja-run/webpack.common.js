const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    app: ["babel-polyfill", "./src/index.js"],
  },
  devtool: "eval-source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    extensions: [".js"],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpe?g|gif|mp3|wav)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "CANVAS_RENDERER": JSON.stringify(true),
      "WEBGL_RENDERER": JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets"),
          to: path.resolve(__dirname, "build/assets"),
        },
      ],
    }),
    new Dotenv(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    compress: true,
    port: 8080,
  },
};
