const envConfig = require('./env.config');

module.exports = {
    debug: true,

    devtool: 'inline-source-map',

    resolve: {
        root: [envConfig.src.dir],
        extensions: ['', '.js', '.ts']
    },
    stats: {
        // Configure the console output
        errorDetails: true, //this does show errors
        colors: false,
        modules: true,
        reasons: true
    },
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: [/node_modules/]
            }
        ],
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: [/\.(e2e)\.ts$/],
                query: {
                    sourceMap: false,
                    inlineSourceMap: true,
                    compilerOptions: {
                        removeComments: true
                    }
                }
            },

            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.(scss|css)$/,
                exclude: [/node_modules/],
                loaders: ['raw', 'sass']
            },
            {
                test: /\.css$/,
                include: [/node_modules/],
                loader: 'style!css'
            }
        ],
        postLoaders: [
            {
                test: /\.ts$/,
                include: envConfig.src.dir,
                loader: 'istanbul-instrumenter-loader',
                exclude: [/\.test\.ts$/, /\.e2e\.ts$/, /node_modules/]
            }
        ]
    }
};
