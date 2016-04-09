const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const envConfig = require('./env.config');

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
            },
            {
                test: /\.html$/,
                loader: 'raw'
            }
        ]
    },

    devServer: {
        port: 8000,
        host: 'localhost',
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    plugins: [
        new CleanWebpackPlugin([envConfig.dist.dir], {root: envConfig.root.dir}),
        new HtmlWebpackPlugin({template: envConfig.src.indexHtml})
    ]
};
