const envConfig = require('./env.config');

module.exports = {
    debug: true,

    devtool: 'source-map',

    resolve: {
        root: [envConfig.src.dir],
        extensions: ['', '.js'],
        alias: {
            /* eslint-disable */

            /*this alias exists for Dragula (drag-and-drop library) to  load angular from angular2/core
             instead from @angular/core which is required from dragula source files  and
             collides with main project  angular*/

            /* eslint-enable */
            '@angular/core': 'angular2/core'
        }
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
