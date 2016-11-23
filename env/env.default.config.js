const deepMerge = require('deepmerge');
const envConfig = require('./env.common.config');

module.exports = deepMerge(envConfig, {
    public: {
        backEndUrl: '//localhost:3000',
        backEndWebSocketUrl: '//localhost:3000'
    }
});
