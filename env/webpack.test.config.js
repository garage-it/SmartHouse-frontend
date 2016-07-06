const envConfig = require('./env.config');

module.exports = {
    debug: true,

    devtool: 'source-map',

    resolve: {
        root: [envConfig.src.dir],
        extensions: ['', '.js']
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'isparta',
                include: envConfig.src.dir,
                exclude: [/\.test\.js$/]
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [/node_modules/]
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
        ]
    }
};
