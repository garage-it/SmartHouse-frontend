const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const envConfig = require('./env.config');

const jsRegexp = /\.js$/;

module.exports = {
    debug: true,

    devtool: 'cheap-source-map',

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
                test: jsRegexp,
                loader: 'source-map'
            },
            {
                test: jsRegexp,
                loader: 'eslint',
                exclude: [/node_modules/]
            }
        ],
        loaders: [
            {
                test: jsRegexp,
                loader: 'babel',
                exclude: [/node_modules/]
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.css$/,
                loader: 'raw'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin([envConfig.dist.dir], {root: envConfig.root.dir}),
        new HtmlWebpackPlugin({template: envConfig.src.indexHtml})
    ]
};
