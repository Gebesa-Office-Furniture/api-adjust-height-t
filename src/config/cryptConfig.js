const ValidationService = require("@src/services/validationService");

/**
 * @typedef {Object} config
 * @property {number} SALT - El SALT de la crypto
 */
const { SALT } = process.env;
/**
 * @type {config}
 */
const config = { SALT: parseInt(SALT, 10) };
ValidationService.verifyConfig(config,"CRYPTCONFIG");

module.exports = config;
