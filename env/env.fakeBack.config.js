const deepMerge = require('deepmerge');
const envConfig = require('./env.common.config');

module.exports = deepMerge(envConfig, {
    public: {
        backEndUrl: `//${envConfig.mockServer.host}:${envConfig.mockServer.port}`,
        backEndWebSocketUrl: `//${envConfig.mockServer.host}:${envConfig.mockServer.port}`
    }
});
