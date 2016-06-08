const envConfig = require('./env.common.config');

module.exports = Object.assign(envConfig, {
    public: {
        backEndUrl: `//${envConfig.mockServer.host}:${envConfig.mockServer.port}`,
        backEndWebSocketUrl: `//${envConfig.mockServer.host}:${envConfig.mockServer.port}`
    }
});
