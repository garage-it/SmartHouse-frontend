const envConfig = require('./env.config');

module.exports = {
    debug: true,

    devtool: 'source-map',

    resolve: {
        root: [envConfig.src.dir],
        extensions: ['', '.ts', '.js']
    },

    module: {
        preLoaders: [
            {
                test: /\.(js|ts)$/,
                loader: 'isparta',
                include: envConfig.src.dir,
                exclude: [/\.test\.(ts|js)$/]
            }
        ],
        loaders: [
            {
                test: /\.(ts|js)$/,
                loader: 'babel',
                exclude: [/node_modules/]
            }
        ]
    }
};
