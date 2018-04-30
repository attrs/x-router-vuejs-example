const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');


module.exports = {
  entry: {
    app: path.join(__dirname, '../public/src'),
    libs: ['x-router']
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
        exclude: /node_modules/
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
        loaders: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            }
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },  {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            }
          }, {
            loader: 'autoprefixer-loader'
          }
        ]
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
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(pkg.version)
    })
  ]
};
