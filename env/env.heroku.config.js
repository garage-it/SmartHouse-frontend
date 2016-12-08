const deepMerge = require('deepmerge');
const envConfig = require('./env.common.config');

module.exports = deepMerge(envConfig, {
    public: {
        backEndUrl: '//garage-it-smart-house-api.herokuapp.com',
        backEndWebSocketUrl: '//garage-it-smart-house-api.herokuapp.com'
    },
});
