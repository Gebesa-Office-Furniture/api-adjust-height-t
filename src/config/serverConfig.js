const ValidationService = require("@src/services/validationService");
/**
 * @typedef {Object} Config
 * @property {string} SERVER_PORT - The port server from express
 */
const { SERVER_PORT } = process.env;
/**
 * @type {Config}
 */
const config = { SERVER_PORT };

ValidationService.verifyConfig(config, 'SERVER');

module.exports = config;
