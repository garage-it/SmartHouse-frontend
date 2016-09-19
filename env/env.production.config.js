const envConfig = require('./env.common.config');

// Will use the same endpoints as current files were served
module.exports = Object.assign(envConfig, {
    public: {
        backEndUrl: '',
        backEndWebSocketUrl: ''
    }
});
