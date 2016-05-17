const envConfig = require('./env.common.config');

module.exports = Object.assign(envConfig, {
    public: {
        backEndUrl: '//localhost:3000',
        backEndWebSocketUrl: '//localhost:3000'
    }
});
