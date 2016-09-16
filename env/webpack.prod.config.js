require('babel-register');

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const webpack = require('webpack');

module.exports = webpackMerge(commonConfig, {
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});
