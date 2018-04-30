const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config.js');

module.exports = merge(base, {
  entry: {
    style: path.join(__dirname, '../public/less/index.less')
  },
  output: {
    path: path.join(__dirname, '../public/dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  devServer: {
    contentBase: [path.join(__dirname, "../public/dist/"), path.join(__dirname, "../public")],
    historyApiFallback: true
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'libs', filename: 'libs.js' }),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'vuejs-practice',
      inject: 'head',
      filename: path.join(__dirname, '../public/dist/index.html'),
      template: path.join(__dirname, '../public/index.html')
    })
  ]
});
