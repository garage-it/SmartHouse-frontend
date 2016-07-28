const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const env = require('./env.config');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-source-map',
    devServer: {
        port: env.staticServer.port,
        host: env.staticServer.host,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        proxy: [
            {
                path: '/api/*',
                target: env.public.backEndUrl
            },
            {
                path: '/socket.io/*',
                target: env.public.backEndUrl
            },
            {
                path: '/websocket',
                target: 'ws://127.0.0.1:3000',
                secure: false,
                ws: true
            }
        ]
    }
});
