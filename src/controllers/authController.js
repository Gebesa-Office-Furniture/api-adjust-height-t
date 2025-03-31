const { usr_users } = require("@database/SQL/auto/databaseModels");
const AuthService = require("@services/authService");
const cryptService = require("@services/cryptService.js");
const jwtService = require("@services/jwtService.js");
const ValidationService = require("@services/validationService");
const tokenService = require("@services/tokenService");
const userService = require("@services/userService");

class AuthController {
  constructor() {}
  /**
   * @type {MiddlewareFunction}
   */
  async login(req, res, next) {
    try {
      var user = new usr_users(req.body);

      if (ValidationService.isNullEmptyOrUndefined(user.sEmail))
        return new TypeError("Email cannot be empty");
      if (ValidationService.isNullEmptyOrUndefined(user.sPassword))
        return new TypeError("Password cannot be empty");


      var userbd = await AuthService.login(user.sEmail);

      var match = await cryptService.verifyPassword(
        user.sPassword,
        userbd.sPassword
      );
      if (!match) {
        throw new TypeError("Password incorrect");
      }

      const privateUser = await userService.settings(userbd.iId);

      const { token, tokenExpiresIn } = jwtService.generateToken(privateUser);
      const { refreshToken, refreshTokenExpiresIn } =
        jwtService.generateRefreshToken(privateUser);
      var exist = await tokenService.verifyRefreshTokenByName(userbd.sEmail);
      if (exist) {
        await tokenService.deactivateRefreshToken(userbd.sEmail);
      }

      await tokenService.addRefreshToken(userbd.sEmail, refreshToken);

      res
        .status(200)
        .json({
          user: privateUser,
          token: { result: token, expiresIn: tokenExpiresIn },
          refreshToken: {
            result: refreshToken,
            expiresIn: refreshTokenExpiresIn,
          },
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  /**
   * @type {MiddlewareFunction}
   */
  async logout(req, res, next) {
    const { refreshtoken } = req.body;

    var isLogout = await tokenService.verifyRefreshToken(refreshtoken);

    if (!isLogout) {
      return res.status(201).json({ message: "No session active" });
    }

    if (!refreshtoken) {
      return res.status(400).json({ error: "Token no proporcionado" });
    }
    var result = await tokenService.deactivateRefreshToken(refreshtoken);

    if (result) {
      res.status(200).json({ message: "Logout successfully" });
    } else {
      res.status(201).json({ message: "No session active" });
    }
  }
  /**
   * @type {MiddlewareFunction}
   */
  async register(req, res, next) {
    try {
      var user = new usr_users(req.body);

      var sPasswordHashed = await cryptService.hashPassword(user.sPassword);
      //change the password for sPasswordHashed
      user.sPassword = sPasswordHashed;
      //verifica la session y regresa el token de acceso del usuario
      const privateUser = await AuthService.register(user);
      const { token, tokenExpiresIn } = jwtService.generateToken(privateUser);
      const { refreshToken, refreshTokenExpiresIn } = jwtService.generateRefreshToken(privateUser);
        res.status(200).json({
          user: privateUser,
          token: { result: token, expiresIn: tokenExpiresIn },
          refreshToken: {
            result: refreshToken,
            expiresIn: refreshTokenExpiresIn,
          },
        });
    } catch (error) {
      next(error);
    }
  }
  /**
   * @type {MiddlewareFunction}
   */
  async refreshToken(req, res, next) {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token required." });

    var isValid = jwtService.verifyRefreshToken(refreshToken);

    if (!isValid)
      return res.status(402).json({ message: "Refresh token is not valid" });

    var isActive = await tokenService.verifyRefreshToken(refreshToken);
    if (!isActive)
      return res
        .status(402)
        .json({ message: "Refresh token is not longer available" });

    if (isValid) {
      delete isValid.iat;
      delete isValid.exp;
      const { token, tokenExpiresIn } = jwtService.generateToken(isValid);
      return res.status(201).json({
        token: {
          result: token,
          expiresIn: tokenExpiresIn,
        },
      });
    }
  }
}

module.exports = new AuthController();
