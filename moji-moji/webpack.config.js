require('@babel/polyfill');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirSrc = path.join(__dirname, 'src');

const outputDirectory = 'dist';

module.exports = {
  entry: ['@babel/polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEV,
              includePaths: [dirSrc]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: IS_DEV,
              includePaths: [dirSrc]
            }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  devServer: {
    port: 8080,
    public: 'https://localhost:8080',
    open: true,
    proxy: {
      '/': 'https://192.168.0.39:80'
    },
    host: '0.0.0.0',
    https: true,
    historyApiFallback: {
      disableDotRule: true
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.png'
    }),
    new CopyWebpackPlugin([
      { from: 'img', to: 'img' },
      { from: 'model', to: 'model' },
      { from: 'audio', to: 'audio' }
    ])
  ]
};
