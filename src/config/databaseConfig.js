const ValidationService = require("@src/services/validationService");
/**
 * @typedef {Object} DbConfig
 * @property {string} DB_SERVER - The database host.
 * @property {string} DB_USER - The username for the database.
 * @property {string} DB_PASSWORD - The password for the database.
 * @property {string} DB_DATABASE - The name of the database.
 * @property {string} DB_PORT - The database port.
 */
const { DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;
/**
 * @type {DbConfig}
 */
const config = { DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT }
ValidationService.verifyConfig(config,'DATABASE');
module.exports = config;
