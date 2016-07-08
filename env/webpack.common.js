const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const envConfig = require('./env.config');

const jsRegexp = /\.js$/;

module.exports = {
    debug: true,
    context: envConfig.src.dir,
    devtool: 'cheap-source-map',
    resolve: {
        root: [envConfig.src.dir],
        extensions: ['', '.ts', '.js'],
        alias: {
            /* eslint-disable */

            /*this alias exists for Dragula (drag-and-drop library) to  load angular from angular2/core
            instead from @angular/core which is required from dragula source files  and
            collides with main project  angular*/

           /* eslint-enable */
            '@angular/core': 'angular2/core'
        }
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
        new CleanWebpackPlugin(
            [envConfig.dist.dir],
            {root: envConfig.root.dir}
        ),
        new HtmlWebpackPlugin({
            template: envConfig.src.indexHtml
        }),
        new CopyWebpackPlugin([{
            from: '**/*.png',
            to: 'assets',
            flatten: true
        }]),
        new ExtractTextPlugin('main.css'),
        new webpack.DefinePlugin({
            ENV_PUBLIC_CONFIG: JSON.stringify(envConfig.public)
        })
    ]
};
