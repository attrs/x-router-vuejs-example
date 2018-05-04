const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanCSSPlugin = require('less-plugin-clean-css');
const pkg = require('../package.json');

const src = path.resolve(__dirname, '../src');

module.exports = {
  entry: {
    app: [src, path.resolve(src, 'less')],
    libs: ['x-router']
  },
  node: {
    __dirname: true,
    __filename: true,
    dns: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                }
              }
            ],
            less: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          postLoaders: {
            html: 'babel-loader'
          },
          sourceMap: true,
        }
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          sourceMap: true,
        },
        include: [
          src
        ]
      }, {
        test: /\.css$/,
        loaders: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true,
              }
            },  {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                plugins: [
                  new CleanCSSPlugin({
                    advanced: true,
                    compatibility: '*'
                  })
                ]
              }
            }, {
              loader: 'autoprefixer-loader'
            }
          ]
        })
      }, {
        test: /\.(jpg|png|woff|woff2|gif|eot|ttf|svg)\??.*$/,
        loader: 'url-loader?limit=16384'
      }, {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.less'],
    mainFields: ['browser', 'main'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(pkg.version)
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
