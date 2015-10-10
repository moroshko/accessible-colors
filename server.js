var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');
var opn = require('opn');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath
}).listen(3000, 'localhost', function(error) {
  if (error) {
    console.log(error); // eslint-disable-line no-console
  } else {
    opn('http://localhost:3000/dist/index.html');
  }
});
