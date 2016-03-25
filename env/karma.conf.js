module.exports = function(config) {
    var webpackConfig = require('./webpack.test.config');
    var envConfig = require('./env.config');
    var preprocessors = {};

    preprocessors[envConfig.tests.entry] = ['webpack'];

    config.set({
        basePath: envConfig.root.dir,

        frameworks: [ 'mocha', 'chai', 'chai-sinon' ],

        exclude: [ ],

        files: [ envConfig.tests.entry ],

        preprocessors: preprocessors,

        webpack: webpackConfig,

        webpackServer: {
            noInfo: true
        },

        reporters: [ 'mocha' ],

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: [ 'PhantomJS' ],

        singleRun: true
    });

};
