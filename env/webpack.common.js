const webpack = require('webpack');

// Webpack Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const envConfig = require('./env.config');

const tsRegexp = /\.ts$/;

function packageSort(packages) {
    return function sort(left, right) {
        var leftIndex = packages.indexOf(left.names[0]);
        var rightindex = packages.indexOf(right.names[0]);

        if (leftIndex < 0 || rightindex < 0) {
            throw 'unknown package';
        }

        if (leftIndex > rightindex){
            return 1;
        }

        return -1;
    }
};

module.exports = {
    devtool: 'source-map',
    context: envConfig.src.dir,
    resolve: {
        modules: [
            envConfig.src.dir,
            envConfig.nodeModules.dir
        ],
        extensions: ['.ts', '.js']
    },
    entry: envConfig.src.entry,
    output: {
        path: envConfig.dist.dir,
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map'
    },
    module: {
        rules: [
            {
                test: tsRegexp,
                use: 'tslint-loader',
                enforce: 'pre',
                exclude: [/node_modules/]
            },
            {
                test: tsRegexp,
                use: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular-router-loader'
                ],
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: 'file-loader'
            },
            {
                test: /\.(scss|css)$/,
                include: [/node_modules/],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(scss|css)$/,
                exclude: [/node_modules/],
                use: [
                    'raw-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(
            [envConfig.dist.dir],
            {root: envConfig.root.dir}
        ),
        new HtmlWebpackPlugin({
            template: envConfig.src.indexHtml,
            chunksSortMode: packageSort(['polyfills', 'vendor', 'main'])
        }),
        new CopyWebpackPlugin([{
            from: '**/*.*(png|svg)',
            to: 'assets',
            flatten: true
        }]),
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new webpack.DefinePlugin({
            ENV_PUBLIC_CONFIG: JSON.stringify(envConfig.public)
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
            envConfig.root.dir
        )
    ]
};
