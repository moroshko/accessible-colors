var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'), // Must be an absolute path
    filename: 'index.js',
    publicPath: '/'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src') // Must be an absolute path
    }, {
      test: /\.less$/,
      loader: 'style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer!less',
      exclude: /node_modules/
    }]
  },

  resolve: {
    modulesDirectories: ['node_modules', 'components', 'src']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      DEV: true
    })
  ]
};
