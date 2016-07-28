const envConfig = require('./env.common.config');

module.exports = Object.assign(envConfig, {
    public: {
        backEndUrl: 'https://garage-it-smart-house-api-qa.herokuapp.com'
    },
});
