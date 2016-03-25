var envConfig = require('./env.config');

module.exports = {
    debug: true,

    resolve: {
        root: envConfig.src.dir
    },

    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts'},
            {test: /\.json$/, loader: 'json'},
            {test: /\.html$/, loader: 'raw', exclude: [envConfig.src.htmlEntry]}
        ]
    },

    resolveLoader: {
        modulesDirectories: [
            envConfig.root.nodeModulesDir
        ]
    },

    node: {
        global: 'window',
        fs: 'empty',
        tls: 'empty',
        net: 'empty'
    }
};
