const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const envConfig = require('./env.config');

module.exports = {
    debug: true,

    devtool: 'source-map',

    resolve: {
        root: [envConfig.src.dir],
        extensions: ['', '.ts', '.js']
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
            {
                test: /\.js/,
                loader: 'source-map'
            },
            {
                test: /\.(js|ts)/,
                loader: 'eslint',
                exclude: [/node_modules/]
            }
        ],
        loaders: [
            {
                test: /\.(ts|js)$/,
                loader: 'babel',
                exclude: [/node_modules/]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin([envConfig.dist.dir], {root: envConfig.root.dir}),
        new HtmlWebpackPlugin({template: envConfig.src.indexHtml})
    ]
};
