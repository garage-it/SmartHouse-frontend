var webpack = require('webpack');
var envConfig = require('./env.config');

module.exports = {
    debug: true,

    devtool: 'source-map',

    resolve: {
        root: [ envConfig.src.dir ],
        extensions: ['', '.ts', '.js']
    },

    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts' },
            { test: /\.html$/, loader: 'raw', exclude: [ envConfig.src.indexHtml ] }
        ],
        postLoaders: [
            {
                test: /\.(js|ts)$/, loader: 'istanbul-instrumenter',
                include: envConfig.src.dir,
                exclude: [ /\.test\.ts$/ ]
            }
        ]
    }
};
