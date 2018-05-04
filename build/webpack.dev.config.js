const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config.js');

const asset = path.resolve(__dirname, '../asset');
const dist = path.resolve(__dirname, '../dist/web');

module.exports = merge(base, {
  output: {
    path: path.resolve(dist, 'js'),
    publicPath: '/js',
    filename: '[name].js'
  },
  devServer: {
    contentBase: [
      dist,
      asset
    ],
    historyApiFallback: true
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'libs', filename: 'libs.js' }),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: 'head',
      filename: path.resolve(dist, 'index.html'),
      template: path.resolve(asset, 'index.html')
    })
  ]
});
