const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const env = require('./env.config');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    devServer: {
        port: env.staticServer.port,
        host: env.staticServer.host,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
});
