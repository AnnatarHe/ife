'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
module.exports = {
    entry: {
      index: path.resolve('./lib/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist',
        filename: 'app.js'
    },
    devtool: '#eval-source-map',
    module: {
        loaders: [{
            test: /.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /.scss$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        }]
    },
    plugins: [
        new ExtractTextPlugin('app.css', {
            disable: false,
            allChunks: true
        })
   ]
}
