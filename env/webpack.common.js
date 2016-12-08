const webpack = require('webpack');

// Webpack Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

const envConfig = require('./env.config');

const tsRegexp = /\.ts$/;

module.exports = {
    debug: true,
    context: envConfig.src.dir,
    devtool: 'source-map',
    resolve: {
        root: [envConfig.src.dir],
        extensions: ['', '.ts', '.js']
    },
    entry: envConfig.src.entry,
    output: {
        path: envConfig.dist.dir,
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map'
    },
    module: {
        preLoaders: [
            {
                test: tsRegexp,
                loader: 'tslint',
                exclude: [/node_modules/]
            }
        ],
        loaders: [
            {
                test: tsRegexp,
                loaders: ['awesome-typescript-loader?', 'angular2-template-loader'],
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(scss|css)$/,
                include: [/node_modules/],
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.(scss|css)$/,
                exclude: [/node_modules/],
                loaders: ['raw', 'sass']
            }
        ]
    },
    plugins: [

        new ForkCheckerPlugin(),

        new CleanWebpackPlugin(
            [envConfig.dist.dir],
            {root: envConfig.root.dir}
        ),
        new HtmlWebpackPlugin({
            template: envConfig.src.indexHtml
        }),
        new CopyWebpackPlugin([{
            from: '**/*.*(png|svg)',
            to: 'assets',
            flatten: true
        }]),
        new ExtractTextPlugin('main.css'),
        new webpack.DefinePlugin({
            ENV_PUBLIC_CONFIG: JSON.stringify(envConfig.public)
        })
    ]
};
