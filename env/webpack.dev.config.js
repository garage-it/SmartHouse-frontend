const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const mock = require('./env.mock.config');
const env = require('./env.config');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-source-map',
    devServer: {
        port: env.server.port,
        host: env.server.host,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        proxy: [
            {
                path: 'api/*',
                target: {
                    port: 3000,
                    host: 'localhost'
                }
            },
            {
                path: '*',
                target: {
                    port: mock.port,
                    host: mock.host
                }
            }
        ]
    }
});
