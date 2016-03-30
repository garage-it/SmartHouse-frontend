var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var envConfig = require('./env.config');

module.exports = {
    debug: true,

    devtool: 'source-map',

    resolve: {
        root: [ envConfig.src.dir ],
        extensions: ['', '.ts', '.js', '.html']
    },

    entry: {
        app: envConfig.src.entry
    },

    output: {
        path: envConfig.dist.dir,

        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map'
    },

    module: {
        preLoaders: [
            { test: /\.js/, loader: 'source-map' },
            { test: /\.ts/, loader: 'tslint' }
        ],
        loaders: [
            { test: /\.ts$/, loader: 'ts' }
        ]
    },

    plugins: [
        new CleanWebpackPlugin([ envConfig.dist.dir], { root: envConfig.root.dir }),
        new HtmlWebpackPlugin({ template: envConfig.src.indexHtml })
    ],

    tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: envConfig.src.dir
    }
};
