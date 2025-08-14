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

      console.log(user);

      /* Aun no se lanza a produccion, por lo que no se valida el telefono y lada
      
      // Validate phone number if provided
      if (user.sPhoneNumber && !ValidationService.isValidPhoneNumber(user.sPhoneNumber)) {
        throw new TypeError("Invalid phone number format");
      }

      // Validate lada (country code) if provided
      if (user.sLada && !ValidationService.isValidLada(user.sLada)) {
        throw new TypeError("Invalid country code format");
      }

      // Ensure lada is provided if phone number is provided and vice versa
      if ((user.sPhoneNumber && !user.sLada) || (!user.sPhoneNumber && user.sLada)) {
        throw new TypeError("Both phone number and country code must be provided");
      }
      */
      
      var sPasswordHashed = await cryptService.hashPassword(user.sPassword);
      user.sPassword = sPasswordHashed;
      
      // Set default package information if not provided
      if (!user.iPackageId) user.iPackageId = 0;
      if (!user.sPackageName) user.sPackageName = "trial";
      if (!user.sPackageInterval) user.sPackageInterval = "month";
      if (!user.sPackageStatus) user.sPackageStatus = "Active";
      
      // Set default credits and tokens if not provided
      if (!user.iCredits) user.iCredits = 10000;
      if (!user.iCreditsUsed) user.iCreditsUsed = 0;
      if (!user.iMultiplier) user.iMultiplier = 10000;
      if (!user.iTokens) user.iTokens = 10000000;
      if (!user.iTokensUsed) user.iTokensUsed = 0;
      
      // Set default preferences as empty string if not provided
      if (!user.objPreferences) {
        user.objPreferences = '';
      }

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
      console.log(error);
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
