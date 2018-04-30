const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const base = require('./webpack.base.config.js');

process.env.NODE_ENV = 'production';

// empty output dir
fs.emptyDirSync(path.join(__dirname, '../docs'));

module.exports = merge(base, {
  output: {
    path: path.join(__dirname, '../docs/js'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
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
      filename: path.join(__dirname, '../docs/index.html'),
      template: path.join(__dirname, '../public/index.dist.html')
    })
  ]
});
