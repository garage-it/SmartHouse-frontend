const deepMerge = require('deepmerge');
const envConfig = require('./env.common.config');

// Will use the same endpoints as current files were served
module.exports = deepMerge(envConfig, {
    public: {
        backEndUrl: '',
        backEndWebSocketUrl: ''
    }
});
