const {
  usr_users,
  usr_userMemories,
  usr_userAdditionalInfo,
  usr_userDevices,
  usr_goals,
  config_userSettings,
} = require("@database/SQL/auto/databaseModels");
const ClaimsService = require("@services/claimsService");
const userService = require("@services/userService");
const ValidationService = require("@services/validationService");
const tokenService = require("@services/tokenService");

class UserController {
  /**
   * @type {MiddlewareFunction}
   */
  async updateInfo(req, res, next) {
    try {
      var user = new usr_users(req.body);
      var claims = new ClaimsService(req);
      user.iId = claims.getID();

      var success = await userService.updateInfo(user);

      if (success) res.status(200).json({ result: "Info was updated" });
      else res.status(401).json({ result: "Info was not updated" });
    } catch (error) {
      next(error);
    }
  }
  async updateAdditionalInfo(req, res, next) {
    try {
      var userAdditional = new usr_userAdditionalInfo(req.body);
      var userSettings= new config_userSettings(req.body);
      var claims = new ClaimsService(req);
      userAdditional.iIdUser = claims.getID();
      userSettings.iIdUser = claims.getID();

      var success = await userService.updateAdditionalInfo(userAdditional,userSettings);

      if (success) res.status(200).json({ result: "Info was updated" });
      else res.status(401).json({ result: "Info was not updated" });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @type {MiddlewareFunction}
   */
  async settings(req, res, next) {
    try {
      var claims = new ClaimsService(req);
      var settings = await userService.settings(claims.getID());
      res.status(201).json({ result: settings });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @type {MiddlewareFunction}
   */
  async logout(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: "Token not provided" });
    }
    var result = await tokenService.deactivateRefreshToken(token);
    if (result) {
      res.json({ message: "Logout successfully" });
    } else {
      next();
    }
  }

  /**
   * @type {MiddlewareFunction}
   */
  async memory(req, res, next) {
    try {
      var claims = new ClaimsService(req);
      var memory = new usr_userMemories(req.body);
      memory.iIdUser = claims.getID();

      if (!ValidationService.isValidNumber(memory.dHeightInch))
        throw new TypeError("Height is not a number");

      if (!ValidationService.isValidNumber(memory.iOrder))
        throw new TypeError("Memory is not a number");
      var success = await userService.memory(memory);

      if (success) res.status(200).json({ result: "Memory was updated" });
      else res.status(401).json({ result: "Memory was not updated" });
    } catch (error) {
      next(error);
    }
  }
  /**
   * @type {MiddlewareFunction}
   */

  async suscribe(req, res, next) {
    try {
      const device = new usr_userDevices(req.body);
      var claims = new ClaimsService(req);
      device.iIdUser = claims.getID();
      device.sName = req.headers['user-agent'];

      await userService.suscribe(device)

      res.json({ message: "Token successfully registered" });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @type {MiddlewareFunction}
   */
  async setgoal(req, res, next) {
    try {
      console.log("entra")
      const goal = new usr_goals(req.body);
      var claims = new ClaimsService(req);
      goal.iIdUser = claims.getID();
      await userService.setGoal(goal)

      res.json({ message: "Set Goal" });
    } catch (error) {
      next(error);
    }
  }
  /**
  * @type {MiddlewareFunction}
  */
  async getgoal(req, res, next) {
    try {
      const goal = new usr_goals(req.body);
      var claims = new ClaimsService(req);
      goal.iIdUser = claims.getID();
      var results = await userService.getGoal(goal)

      res.json({ results });
    } catch (error) {
      next(error);
    }
  }
  /**
 * @type {MiddlewareFunction}
 */
  async delete(req, res, next) {
    try {
      const { refreshToken, deleteWord } = req.body;
      const last5delete = refreshToken.slice(-5);
      if (last5delete != deleteWord) {
        throw new Error("You've entered an incorrect word to delete your account!!. this action is irreversible!!.")
      }

      var claims = new ClaimsService(req);
      var iId = claims.getID();
      var isLogout = await tokenService.verifyRefreshToken(refreshToken);

      if (!isLogout) {
        return res.status(201).json({ message: "No active session" });
      }

      if (!refreshToken) {
        return res.status(400).json({ error: "Token not provided" });
      }

      var success = await userService.delete(iId);
      if (success) {
        var result = await tokenService.deactivateRefreshToken(refreshToken);
        res.status(200).json({ message: "Logged out and deleted successfully." });
      }
      else {
        res.status(500).json({ message: "The account could not be found." });
      }

    } catch (error) {
      next(error)
    }
  }
  /**
   * @type {MiddlewareFunction}
   */
  async test(req, res, next) {
    try {
      var claims = new ClaimsService(req);
      res.status(201).send(`Now you're connected ${claims.getNAME()}`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();