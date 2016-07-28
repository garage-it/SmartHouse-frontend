const envConfig = require('./env.common.config');

module.exports = Object.assign(envConfig, {
    public: {
        backEndUrl: 'http://localhost:3000'
    }
});
