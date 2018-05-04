const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const base = require('./webpack.base.config.js');

process.env.NODE_ENV = 'production';

const asset = path.resolve(__dirname, '../asset');
const dist = path.resolve(__dirname, '../docs');

// empty output dir
fs.emptyDirSync(dist);

module.exports = merge(base, {
  output: {
    path: path.resolve(dist, 'js'),
    publicPath: '/js',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.min.js'
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'libs', filename: 'libs.js' }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unused: true
      },
      mangle: true,
      beautify: false,
      parallel: true,
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      title: 'vuejs-practice',
      inject: 'head',
      filename: path.join(dist, 'index.html'),
      template: path.join(asset, 'index.html')
    }),
    new CopyWebpackPlugin([
      { from: path.join(asset, 'favicon.png'), to: dist }
    ])
  ]
});
