const env = process.env.ENV_CONFIG || 'default';
const config = require(`./env.${env}.config`);

module.exports = config;
