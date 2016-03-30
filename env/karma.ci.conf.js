module.exports = function(config) {
    var webpackConfig = require('./webpack.test.config');
    var envConfig = require('./env.config');

    var preprocessors = {};

    preprocessors[envConfig.tests.entry] = ['coverage', 'webpack', 'sourcemap'];

    config.set({
        basePath: '',

        frameworks: [ 'jasmine' ],

        files: [ envConfig.tests.entry ],

        preprocessors: preprocessors,

        webpack: webpackConfig,

        webpackServer: { noInfo: true },

        reporters: [ 'mocha', 'coverage' ],

        coverageReporter: {
            reporters: [
                { type: 'text-summary' },
                { type: 'html' }
            ]
        },

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: [ 'PhantomJS' ],

        singleRun: true
    });

};
