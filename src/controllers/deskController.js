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
      const claims = new ClaimsService(req);
      const desk   = new DeskModel(req.body);
      desk.iIdUser = claims.getID();

      /* ───── Normalización previa ───── */
      // La app envía iStatus como string; lo convertimos a número
      if (typeof desk.iStatus === "string") {
        desk.iStatus = Number(desk.iStatus);
      }

      /* ───── Validaciones ───── */
      if (!ValidationService.isValidString(desk.sDeskName))
        throw new TypeError("sDeskName is not a string");

      if (!ValidationService.isValidString(desk.sUUID))
        throw new TypeError("sUUID is not a string");

      if (!ValidationService.isValidNumber(desk.iStatus))
        throw new TypeError("iStatus is not a number");

      if (
        desk.dMinHeightMm !== undefined &&
        !ValidationService.isValidNumber(desk.dMinHeightMm)
      )
        throw new TypeError("dMinHeightMm is not a number");

      if (
        desk.dMaxHeightMm !== undefined &&
        !ValidationService.isValidNumber(desk.dMaxHeightMm)
      )
        throw new TypeError("dMaxHeightMm is not a number");

      /* ───── Servicio ───── */
      const result = await deskService.connection(desk);

      /* ───── Respuesta ───── */
      if (result) {
        const allowedKeys = [
          "sUUID",
          "sDeskName",
          "iStatus",
          "dMinHeightMm",
          "dMaxHeightMm",
        ];
        const filteredJSON = UtilsService.filterJSON(result, allowedKeys);
        res.status(200).json({ result: filteredJSON });
      } else {
        res.status(401).json({ result: "connection was not created" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DeskController();
