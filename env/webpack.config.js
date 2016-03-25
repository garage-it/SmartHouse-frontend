const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var config = require('./env.config');

module.exports = {
    debug: true,

    resolve: {
        extensions: ['', '.ts', '.js', '.html']
    },

    entry: {
        'app': config.src.entry
    },

    output: {
        path: config.dist.dir,

        filename: '[name].bundle.js'
    },

    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts'},
            {test: /\.json$/, loader: 'json'},
            {test: /\.html$/, loader: 'raw', exclude: [config.src.htmlEntry]}
        ]
    },

    plugins: [
        new CleanWebpackPlugin([config.dist.dir]),
        new HtmlWebpackPlugin({template: config.src.htmlEntry})
    ],

    tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: config.src.dir
    }
};
