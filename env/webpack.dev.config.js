const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
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
                path: '*',
                target: {
                    host: env.server.host,
                    port: env.server.mock.port
                }
            }
        ]
    }
});
