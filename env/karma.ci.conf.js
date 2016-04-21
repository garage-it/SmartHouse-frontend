module.exports = (config) => {
    const webpackConfig = require('./webpack.test.config');
    const envConfig = require('./env.config');

    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [envConfig.tests.entry],

        preprocessors: {
            [envConfig.tests.entry]: ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackServer: {noInfo: true},

        reporters: ['mocha', 'coverage'],

        coverageReporter: {
            reporters: [
                {type: 'text-summary'},
                {type: 'html'},
                {type: 'lcov', subdir: 'lcov'}
            ]
        },

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['PhantomJS'],

        singleRun: true
    });
};
