const envConfig = require('./env.common.config');

module.exports = Object.assign(envConfig, {
    public: {
        backEndUrl: '//localhost:9000',
        backEndWebSocketUrl: '//localhost:9000'
    }
});
