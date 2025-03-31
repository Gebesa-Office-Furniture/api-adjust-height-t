const ClaimsService = require("@services/claimsService");
const routineService = require("@services/routineService");
const ValidationService = require("@services/validationService");
const { Routine } = require("@modelsExtras/RoutineModel");

class RoutineController {
  /**
   * Create routine or update routine
   * @type {MiddlewareFunction}
   */
  async create_routine(req, res, next) {
    try {
      var claims = new ClaimsService(req);
      var routine = new Routine(req.body);
      routine.iIdUser = claims.getID();

      if (!ValidationService.isValidNumber(routine.iDurationSeconds))
        throw new TypeError("iDurationSeconds is not a number");
      if (!ValidationService.isValidNumber(routine.iStatus))
        throw new TypeError("iStatus is not a number");
      if (!ValidationService.isValidNumber(routine.iSedentarismo))
        throw new TypeError("iSedentarismo is not a number");


      var success = await routineService.create_routine(routine);

      if (success) res.status(200).json({ result: success });
      else res.status(401).json({ result: "The routine was not created or updated" });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get routines for user
   * @type {MiddlewareFunction}
   */
  async get_routine(req, res, next) {
    try {
      var claims = new ClaimsService(req);
      var routine = new Routine(req.body);
      routine.iIdUser = claims.getID();

      var success = await routineService.get_routine(routine);

      if (success) res.status(200).json({ result: success });
      else res.status(401).json({ result: "The routine could not be obtained" });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Star routines for user
   * @type {MiddlewareFunction}
   */
  async start_routine(req, res, next) {
    try {
      var claims = new ClaimsService(req);
      var routine = new Routine(req.body);
      routine.iIdUser = claims.getID();

      var success = await routineService.star_routine(routine);

      if (success) res.status(200).json({ result: success });
      else res.status(401).json({ result: "The routine was not started" });
    } catch (error) {
      next(error);
    }
  }

  /**
  * Star routines for user
  * @type {MiddlewareFunction}
  */
  async stop_routine(req, res, next) {
    try {
      var claims = new ClaimsService(req);
      var routine = new Routine();
      routine.iIdUser = claims.getID();

      await routineService.stop_routine(routine);

      res.status(200).json({ result: "The routine stopped" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoutineController();
