var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var express = require('express');//基于node的express框架的服务系统
var opn = require('opn');//打开浏览器的一个插件

var app = express();
var compiler = webpack(config);

var webpackDevOptions = {
    noInfo: true,
    historyApiFallback: true,
    publicPath: config.output.publicPath,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8888
};

var port = process.env.PORT || webpackDevOptions.port;

var uri = 'http://localhost:' + port;

opn(uri); // 自动打开网页

app.use(require('webpack-dev-middleware')(compiler, webpackDevOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.get('*',function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(port)