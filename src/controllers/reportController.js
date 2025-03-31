const ClaimsService = require("@services/claimsService");
const reportService = require("@services/reportService");
const ValidationService = require("@services/validationService");
const Report = require("@modelsExtras/ReportModel");

class ReportController {
  /**
   * Create routine or update routine
   * @type {MiddlewareFunction}
   */
  async get_report(req, res, next) {
    try {
      var claims = new ClaimsService(req);
      var report = new Report(req.body);
      report.iIdUser = claims.getID();

      if (!ValidationService.isValidString(report.sTime))
        throw new TypeError("sTime is not a  'Today', 'Week', 'Month', 'Year'");

      var success = await reportService.get_reporuser(report);

      if (success) res.status(200).json({ result: success });
      else res.status(401).json({ result: "Report was not get" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReportController();
