module.exports = (config) => {
    const webpackConfig = require('./webpack.test.config');
    const envConfig = require('./env.config');

    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [envConfig.tests.entry],

        preprocessors: {
            [envConfig.tests.entry]: ['coverage', 'webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackServer: {noInfo: true},

        webpackMiddleware: {stats: 'errors-only'},

        reporters: ['mocha', 'coverage', 'remap-coverage'],

        coverageReporter: {
            type: 'in-memory'
        },

        remapCoverageReporter: {
            json: './coverage/coverage-final.json',
            html: './coverage/html',
            lcovonly: './coverage/lcov/lcov.info'
        },

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['PhantomJS'],

        singleRun: true
    });
};
