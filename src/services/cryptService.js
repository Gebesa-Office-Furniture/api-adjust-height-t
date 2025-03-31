
const bcrypt = require("bcrypt");
const config = require("@config/cryptConfig");
class EncryptServices {
    /**
     * 
     * @param {string} password 
     * @returns {Promise<boolean>}
     */
    async hashPassword(password) {
        const saltRounds =parseInt(config.SALT); // Cost factor
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
      }
      /**
       * 
       * @param {string} enteredPassword 
       * @param {string} storedHashedPassword 
       * @returns {Promise<boolean>}
       */
    async verifyPassword(enteredPassword, storedHashedPassword) {
        const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
        return isMatch;
    }
}

module.exports = new EncryptServices();
