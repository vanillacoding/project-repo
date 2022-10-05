const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "../src/app.js"),
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    clean: true,
  },
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../assets"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      favicon: path.resolve(__dirname, "../assets/favicon.webp"),
      meta: {
        viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
      },
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[id].css",
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "../src"),
        exclude: /(node_modules)|(dist)/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/images/",
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/fonts/",
            },
          },
        ],
      },
    ],
  },
};
