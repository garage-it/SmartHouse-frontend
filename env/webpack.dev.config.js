const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const env = require('./env.config');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-source-map',
    devServer: {
        port: env.server.port,
        host: 'localhost',
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        proxy: [
            {
                path: '/api/*',
                target: {
                    host: env.webpackServer.host,
                    port: env.server.port
                }
            }
        ]
    }
});
