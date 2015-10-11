var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.config');
var opn = require('opn');
var app = express();
var compiler = webpack(config);
var port = 1704;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err); // eslint-disable-line no-console
  } else {
    opn('http://localhost:' + port);
  }
});
