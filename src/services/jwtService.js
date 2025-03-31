// jwtService.js
const jwt = require("jsonwebtoken");
const JWTConfig = require("@config/JWTConfig");
const UtilsService = require("@services/utilsService");

class jwtService {
  /**
   * Generate a JWT token
   * @param {Object} payload - The data to encode in the JWT
   * @returns {Object} The generated JWT token
   */
  generateToken(payload) {
    const secret = JWTConfig.JWT_TOKEN_SECRET;
    const expiration = JWTConfig.JWT_TOKEN_EXPIRATION;
    const expiresIn = UtilsService.convertToSeconds(expiration);
   
    const token = jwt.sign(payload, secret, {
      expiresIn: expiration,
      algorithm: "HS256",
    });
    
    return {
      token,
      tokenExpiresIn:expiresIn
    }
  }
  generateRefreshToken(payload) {
    const secret = JWTConfig.JWT_REFRESH_TOKEN_SECRET;
    const expiration = JWTConfig.JWT_REFRESH_TOKEN_EXPIRATION;
    const expiresIn = UtilsService.convertToSeconds(expiration);

    const refreshToken = jwt.sign(payload, secret, {
      expiresIn: expiration,
      algorithm: "HS256",
    });
    
    return {
      refreshToken,
      refreshTokenExpiresIn:expiresIn
    }
  }

  /**
   * Verify a JWT token
   * @param {string} token - The JWT token to verify
   * @returns {Object} The decoded token if valid
   * @throws Will throw an error if the token is invalid or expired
   */
  verifyToken(token) {
    const secret = JWTConfig.JWT_TOKEN_SECRET;
    try {
      var token = jwt.verify(token, secret, { algorithm: "HS256" });
      return token;
    } catch (err) {
      return null;
    }
  }
  verifyRefreshToken(token) {
    const secret = JWTConfig.JWT_REFRESH_TOKEN_SECRET;
    try {
      return jwt.verify(token, secret, { algorithm: "HS256" });
    } catch (err) {
      return null;
    }
  }
}
module.exports = new jwtService();
