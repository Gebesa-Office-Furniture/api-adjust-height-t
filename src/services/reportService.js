const { report_GeneralUserReport} = require("@database/SQL/auto/databaseStoreProcedures");
const Report = require("@modelsExtras/ReportModel");
const { report_Sp_sedentaryNotificationReturnModel, report_userMovementHistory } = require("@src/database/SQL/auto/databaseModels");
const { report_Sp_sedentaryNotification } = require("@src/database/SQL/auto/databaseStoreProcedures");
const database = require("@database/SQL/database");

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

  /**
   * Get latest movement history by user ID
   * @param {number} iIdUser - User ID
   * @returns {report_userMovementHistory|null}
   */
  async get_latest_movement_by_user(iIdUser) {
    return await database.using(async (pool) => {
      const sql = require("mssql");
      console.log("User ID:", iIdUser);
    
      const result = await pool
        .request()
        .input("iIdUser", sql.Int, iIdUser)
        .query(`
         SELECT TOP (1) umh.dHeightInch
         FROM report.userMovementHistory AS umh
         LEFT JOIN usr.users AS usr ON umh.iIdUserDeskHistory = usr.iId
         WHERE usr.iId = @iIdUser
         ORDER BY umh.dtRegistrationDate DESC
        `);
    
      // Instancia el modelo o devuelve null si no hubo movimientos
      return result.recordset[0]
        ? new report_userMovementHistory(result.recordset[0])
        : null;
    });
  }
}

module.exports = new ReportService();