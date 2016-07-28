const envConfig = require('./env.common.config');

module.exports = Object.assign(envConfig, {
    public: {
        backEndUrl: `http://${envConfig.mockServer.host}:${envConfig.mockServer.port}`
    }
});
