var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

var PRODUCTION = process.env.NODE_ENV === 'production';
var DEVELOPMENT = process.env.NODE_ENV === 'development';

var plugins = PRODUCTION
        ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
          ]
        : [ 
            new webpack.HotModuleReplacementPlugin(),
            new htmlWebpackPlugin({
                template: './index.template.html',
                inject: 'body',
                filename: './index.html'
            })
        ];
   
   plugins.push(
       new webpack.DefinePlugin({
           DEVELOPMENT: JSON.stringify(DEVELOPMENT),
           PRODUCTION:  JSON.stringify(PRODUCTION)
       })
   )

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loaders: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: '/node_modules/',
                loaders: ['style-loader','css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],//自动识别文件名这些后缀
    },
    plugins: plugins
}