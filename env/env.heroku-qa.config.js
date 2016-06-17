const envConfig = require('./env.common.config');

module.exports = Object.assign(envConfig, {
    public: {
        backEndUrl: '//garage-it-smart-house-api-qa.herokuapp.com',
        backEndWebSocketUrl: '//garage-it-smart-house-api-qa.herokuapp.com'
    },
});
