const webpack = require('webpack');

const envConfig = require('./env.config');

const tsRegexp = /\.ts$/;

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        modules: [
            envConfig.src.dir,
            envConfig.nodeModules.dir
        ],
        extensions: ['.js', '.ts']
    },
    stats: {
        errorDetails: true,
        colors: false,
        modules: true,
        reasons: true
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
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/],
                loader: 'awesome-typescript-loader',
                options: {
                    sourceMap: false,
                    inlineSourceMap: true,
                    compilerOptions: {
                        removeComments: true
                    }
                }
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.(scss|css)$/,
                exclude: [/node_modules/],
                use: [
                    'raw-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                include: [/node_modules/],
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: tsRegexp,
                include: envConfig.src.dir,
                enforce: 'post',
                use: 'istanbul-instrumenter-loader',
                exclude: [/\.test\.ts$/, /\.e2e\.ts$/, /node_modules/]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV_PUBLIC_CONFIG: JSON.stringify(envConfig.public)
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
            envConfig.root.dir
        )
    ]
};
