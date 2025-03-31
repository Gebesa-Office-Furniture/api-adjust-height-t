const { report_GeneralUserReport} = require("@database/SQL/auto/databaseStoreProcedures");
const Report = require("@modelsExtras/ReportModel");
const { report_Sp_sedentaryNotificationReturnModel } = require("@src/database/SQL/auto/databaseModels");
const { report_Sp_sedentaryNotification } = require("@src/database/SQL/auto/databaseStoreProcedures");

class ReportService {
   /**
   * GET REPORT USER
   * @param {Routine} routine 
   * @returns {Report[]}
   */
   async get_reporuser(filters) {
    const repor_data = await report_GeneralUserReport({iIdUser:filters.iIdUser,sTime:filters.sTime}).firstOrDefault()
    return repor_data;
  }

  /**
   * sedentary mode
   * @returns {report_Sp_sedentaryNotificationReturnModel[]}
   */
     async check_sedentary_mode() {
      const sedentary_notifications = await report_Sp_sedentaryNotification()
      return sedentary_notifications;
    }
}

module.exports = new ReportService();