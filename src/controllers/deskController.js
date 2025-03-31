const ClaimsService = require("@services/claimsService");
const deskService = require("@services/deskService");
const ValidationService = require("@services/validationService");
const DeskModel = require("@modelsExtras/DeskModel");
const MovementHistory = require("@modelsExtras/MovementModel");
const UtilsService = require("@src/services/utilsService");

class DeskController {
  /**
   * Crea movement de todos los movimientos de la mesa
   * @type {MiddlewareFunction}
   */
  async movement(req, res, next) {
    try {
      var claims = new ClaimsService(req);
      var movement = new MovementHistory(req.body);
      movement.iIdUserDeskHistory = claims.getID();

      if (!ValidationService.isValidNumber(movement.dHeightInch))
        throw new TypeError("Height is not a number");

      if (!ValidationService.isValidNumber(movement.iOrder))
        throw new TypeError("Memory is not a number");
      var success = await deskService.create_userMovementHistory(movement);

      if (success) res.status(200).json({ result: "Movement was create" });
      else res.status(401).json({ result: "Movement was not create" });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea la conexion con la mesa
   * @type {MiddlewareFunction}
   */
  async connection(req, res, next) {
    try {
      var claims = new ClaimsService(req);
      var desk = new DeskModel(req.body);
      desk.iIdUser = claims.getID();

      if (!ValidationService.isValidString(desk.sUUID))
        throw new TypeError("sUUID is not a string");

      if (!ValidationService.isValidNumber(desk.iStatus))
        throw new TypeError("iStatus is not a number");
      var success = await deskService.connection(desk);

      if (success) {
        const allowedKeys = ["sUUID", "iStatus", "sDeskName"];
        const filteredJSON = UtilsService.filterJSON(success, allowedKeys);
        res.status(200).json({ result: filteredJSON });
      }
      else res.status(401).json({ result: "connection was not create" });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new DeskController();
