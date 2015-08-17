var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index',

  output: {
    filename: './dist/index.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src') // Must be an absolute path
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer!less'),
      exclude: /node_modules/
    }]
  },

  resolve: {
    modulesDirectories: ['node_modules', 'components']
  },

  plugins: [
    new ExtractTextPlugin('./dist/app.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ]
};
