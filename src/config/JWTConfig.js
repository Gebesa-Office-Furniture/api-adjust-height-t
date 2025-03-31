const ValidationService = require("@src/services/validationService");
/**
 * @typedef {Object} Config
 * @property {string} JWT_TOKEN_SECRET - The secret key for the JWT token.
 * @property {string} JWT_TOKEN_EXPIRATION - The expiration of the JWT token in seconds.
 * @property {string} JWT_REFRESH_TOKEN_SECRET - The secret key for the JWT refresh token.
 * @property {string} JWT_REFRESH_TOKEN_EXPIRATION - The expiration of the JWT refresh token in seconds.
 */
const { JWT_TOKEN_SECRET, JWT_TOKEN_EXPIRATION, JWT_REFRESH_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRATION } = process.env;
/**
 * @type {Config}
 */
const config = { JWT_TOKEN_SECRET, JWT_TOKEN_EXPIRATION, JWT_REFRESH_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRATION };

ValidationService.verifyConfig(config,'JWT');

module.exports = config;
