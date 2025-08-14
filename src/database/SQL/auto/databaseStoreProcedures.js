const sql = require("mssql");
const database = require("../database");
const models = require("./databaseModels");

class databaseStoreProcedures{
/**
* @function report_GeneralUserReport
* @description Execute stored procedure report_GeneralUserReport
* @param {Object} parameters 
* @param {number} parameters.iIdUser - Required
* @param {string} parameters.sTime - Required 
* @returns {Promise<models.report_GeneralUserReportReturnModel[]>} The result of the stored procedure
*/
async report_GeneralUserReport(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.input("sTime", sql.NVarChar, parameters.sTime)
			.execute("report.GeneralUserReport");
		return result.recordset;
	});
}


/**
* @function report_GeneralUserReportv2
* @description Execute stored procedure report_GeneralUserReportv2
* @param {Object} parameters 
* @param {number} parameters.iIdUser - Required
* @param {string} parameters.sTime - Required 
* @returns {Promise<models.report_GeneralUserReportv2ReturnModel[]>} The result of the stored procedure
*/
async report_GeneralUserReportv2(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.input("sTime", sql.NVarChar, parameters.sTime)
			.execute("report.GeneralUserReportv2");
		return result.recordset;
	});
}


/**
* @function desk_SP_Conexion
* @description Execute stored procedure desk_SP_Conexion
* @param {Object} parameters 
* @param {number} parameters.iIdUser - Required
* @param {string} parameters.sDeskName - Required
* @param {string} parameters.sUUID - Required
* @param {number} parameters.iStatus - Required 
* @returns {Promise<models.desk_SP_ConexionReturnModel[]>} The result of the stored procedure
*/
async desk_SP_Conexion(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.input("sDeskName", sql.NVarChar, parameters.sDeskName)
			.input("sUUID", sql.NVarChar, parameters.sUUID)
			.input("iStatus", sql.Int, parameters.iStatus)
			.input("iMinHeightMm", sql.Int, parameters.iMinHeightMm)
			.input("iMaxHeightMm", sql.Int, parameters.iMaxHeightMm)
			.execute("desk.SP_Conexion");
		return result.recordset;
	});
}


/**
* @function usr_SP_create_routine
* @description Execute stored procedure usr_SP_create_routine
* @param {Object} parameters 
* @param {number} parameters.iId - Required
* @param {number} parameters.iIdUser - Required
* @param {string} parameters.sRoutineName - Required
* @param {number} parameters.iDurationSeconds - Required
* @param {number} parameters.iStatus - Required
* @param {number} parameters.iSedentarismo - Required 
* @returns {Promise<models.usr_SP_create_routineReturnModel[]>} The result of the stored procedure
*/
async usr_SP_create_routine(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iId", sql.Int, parameters.iId)
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.input("sRoutineName", sql.NVarChar, parameters.sRoutineName)
			.input("iDurationSeconds", sql.Int, parameters.iDurationSeconds)
			.input("iStatus", sql.Int, parameters.iStatus)
			.input("iSedentarismo", sql.Int, parameters.iSedentarismo)
			.execute("usr.SP_create_routine");
		return result.recordset;
	});
}


/**
* @function report_SP_create_userMovementHistory
* @description Execute stored procedure report_SP_create_userMovementHistory
* @param {Object} parameters 
* @param {number} parameters.iIdUserDeskHistory - Required
* @param {number} parameters.iOrder - Required
* @param {number} parameters.dHeightInch - Required
* @param {number} parameters.iIdRoutine - Required 
* @returns {Promise<models.report_SP_create_userMovementHistoryReturnModel[]>} The result of the stored procedure
*/
async report_SP_create_userMovementHistory(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iIdUserDeskHistory", sql.Int, parameters.iIdUserDeskHistory)
			.input("iOrder", sql.Int, parameters.iOrder)
			.input("dHeightInch", sql.Decimal(18,6), parameters.dHeightInch)
			.input("iIdRoutine", sql.Int, parameters.iIdRoutine)
			.execute("report.SP_create_userMovementHistory");
		return result.recordset;
	});
}


/**
* @function test_SP_critico
* @description Execute stored procedure test_SP_critico
* @param {Object} parameters 
 
* @returns {Promise<models.test_SP_criticoReturnModel[]>} The result of the stored procedure
*/
async test_SP_critico() {
	return await database.using(async function(pool) {
		const result = await pool
			.request()

			.execute("test.SP_critico");
		return result.recordset;
	});
}


/**
* @function desk_SP_desks_merge
* @description Execute stored procedure desk_SP_desks_merge
* @param {Object} parameters 
* @param {number} parameters.iCategory - Required
* @param {string} parameters.sDeskName - Required
* @param {string} parameters.sUUID - Required
* @param {number} parameters.iStatus - Required
* @param {number} parameters.iIdUserLastConnected - Required 
* @returns {Promise<models.desk_SP_desks_mergeReturnModel[]>} The result of the stored procedure
*/
async desk_SP_desks_merge(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iCategory", sql.Int, parameters.iCategory)
			.input("sDeskName", sql.NVarChar, parameters.sDeskName)
			.input("sUUID", sql.NVarChar, parameters.sUUID)
			.input("iStatus", sql.Int, parameters.iStatus)
			.input("iIdUserLastConnected", sql.Int, parameters.iIdUserLastConnected)
			.execute("desk.SP_desks_merge");
		return result.recordset;
	});
}


/**
* @function usr_SP_gerRoutines
* @description Execute stored procedure usr_SP_gerRoutines
* @param {Object} parameters 
* @param {number} parameters.iId - Required
* @param {number} parameters.iIdUser - Required
* @param {number} parameters.iStatus - Required
* @param {number} parameters.iSedentarismo - Required
* @param {string} parameters.sRoutineName - Required 
* @returns {Promise<models.usr_SP_gerRoutinesReturnModel[]>} The result of the stored procedure
*/
async usr_SP_gerRoutines(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iId", sql.Int, parameters.iId)
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.input("iStatus", sql.Int, parameters.iStatus)
			.input("iSedentarismo", sql.Int, parameters.iSedentarismo)
			.input("sRoutineName", sql.NVarChar, parameters.sRoutineName)
			.execute("usr.SP_gerRoutines");
		return result.recordset;
	});
}


/**
* @function usr_SP_getDevices
* @description Execute stored procedure usr_SP_getDevices
* @param {Object} parameters 
 
* @returns {Promise<models.usr_SP_getDevicesReturnModel[]>} The result of the stored procedure
*/
async usr_SP_getDevices() {
	return await database.using(async function(pool) {
		const result = await pool
			.request()

			.execute("usr.SP_getDevices");
		return result.recordset;
	});
}


/**
* @function usr_SP_getUsers
* @description Execute stored procedure usr_SP_getUsers
* @param {Object} parameters 
* @param {number} parameters.iId - Required 
* @returns {Promise<models.usr_SP_getUsersReturnModel[]>} The result of the stored procedure
*/
async usr_SP_getUsers(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iId", sql.Int, parameters.iId)
			.execute("usr.SP_getUsers");
		return result.recordset;
	});
}


/**
* @function usr_SP_goal_get
* @description Execute stored procedure usr_SP_goal_get
* @param {Object} parameters 
* @param {number} parameters.iIdUser - Required 
* @returns {Promise<models.usr_SP_goal_getReturnModel[]>} The result of the stored procedure
*/
async usr_SP_goal_get(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.execute("usr.SP_goal_get");
		return result.recordset;
	});
}


/**
* @function usr_SP_goals_merge
* @description Execute stored procedure usr_SP_goals_merge
* @param {Object} parameters 
* @param {number} parameters.iIdUser - Required
* @param {number} parameters.iStandingTimeSeconds - Required
* @param {number} parameters.iSittingTimeSeconds - Required
* @param {number} parameters.iCaloriesToBurn - Required 
* @returns {Promise<models.usr_SP_goals_mergeReturnModel[]>} The result of the stored procedure
*/
async usr_SP_goals_merge(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.input("iStandingTimeSeconds", sql.Int, parameters.iStandingTimeSeconds)
			.input("iSittingTimeSeconds", sql.Int, parameters.iSittingTimeSeconds)
			.input("iCaloriesToBurn", sql.Int, parameters.iCaloriesToBurn)
			.execute("usr.SP_goals_merge");
		return result.recordset;
	});
}


/**
* @function config_SP_parameters_merge
* @description Execute stored procedure config_SP_parameters_merge
* @param {Object} parameters 
* @param {number} parameters.iId - Required
* @param {string} parameters.sKey - Required
* @param {string} parameters.sDescription - Required
* @param {string} parameters.sValue - Required
* @param {number} parameters.iValue - Required
* @param {number} parameters.iIdUser - Required 
* @returns {Promise<models.config_SP_parameters_mergeReturnModel[]>} The result of the stored procedure
*/
async config_SP_parameters_merge(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iId", sql.Int, parameters.iId)
			.input("sKey", sql.NVarChar, parameters.sKey)
			.input("sDescription", sql.NVarChar, parameters.sDescription)
			.input("sValue", sql.NVarChar, parameters.sValue)
			.input("iValue", sql.Int, parameters.iValue)
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.execute("config.SP_parameters_merge");
		return result.recordset;
	});
}


/**
* @function report_Sp_sedentaryNotification
* @description Execute stored procedure report_Sp_sedentaryNotification
* @param {Object} parameters 
 
* @returns {Promise<models.report_Sp_sedentaryNotificationReturnModel[]>} The result of the stored procedure
*/
async report_Sp_sedentaryNotification() {
	return await database.using(async function(pool) {
		const result = await pool
			.request()

			.execute("report.Sp_sedentaryNotification");
		return result.recordset;
	});
}


/**
* @function report_SP_start_routineUser
* @description Execute stored procedure report_SP_start_routineUser
* @param {Object} parameters 
* @param {number} parameters.iIdUser - Required
* @param {number} parameters.iId - Required 
* @returns {Promise<models.report_SP_start_routineUserReturnModel[]>} The result of the stored procedure
*/
async report_SP_start_routineUser(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.input("iId", sql.Int, parameters.iId)
			.execute("report.SP_start_routineUser");
		return result.recordset;
	});
}


/**
* @function report_SP_stop_routineUser
* @description Execute stored procedure report_SP_stop_routineUser
* @param {Object} parameters 
* @param {number} parameters.iIdUser - Required 
* @returns {Promise<models.report_SP_stop_routineUserReturnModel[]>} The result of the stored procedure
*/
async report_SP_stop_routineUser(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.execute("report.SP_stop_routineUser");
		return result.recordset;
	});
}


/**
* @function usr_SP_User_delete
* @description Execute stored procedure usr_SP_User_delete
* @param {Object} parameters 
* @param {number} parameters.iId - Required
* @param {string} parameters.anonymizedName - Required (debe coincidir con tipo NVARCHAR(100))
* @param {string} parameters.anonymizedEmail - Required (debe coincidir con tipo NVARCHAR(100) encriptado)
* @returns {Promise<models.usr_SP_User_deleteReturnModel[]>} The result of the stored procedure
*/
async usr_SP_User_delete(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iId", sql.Int, parameters.iId)
			.input("anonymizedName", sql.NVarChar(100), parameters.anonymizedName)
			.input("anonymizedEmail", sql.NVarChar(100), parameters.anonymizedEmail)
			.execute("usr.SP_User_delete");
		return result.recordset;
	});
}


/**
* @function usr_SP_user_login
* @description Execute stored procedure usr_SP_user_login
* @param {Object} parameters 
* @param {string} parameters.sEmail - Required 
* @returns {Promise<models.usr_SP_user_loginReturnModel[]>} The result of the stored procedure
*/
async usr_SP_user_login(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("sEmail", sql.NVarChar(100), parameters.sEmail) // Tipo exacto para Always Encrypted
			.execute("usr.SP_user_login");
		return result.recordset;
	});
}


/**
* @function usr_SP_user_merge
* @description Execute stored procedure usr_SP_user_merge (original SP + update new fields)
* @param {Object} parameters 
* @param {number} parameters.iId - Required
* @param {string} parameters.sName - Required
* @param {string} parameters.sEmail - Required
* @param {string} parameters.sPassword - Required
* @param {string} parameters.sProfilePicture - Required
* @param {number} parameters.iPackageId - Package ID (default: 0)
* @param {string} parameters.sPackageName - Package name (default: "trial")
* @param {string} parameters.sPackageInterval - Package interval (default: "month")
* @param {string} parameters.sPackageStatus - Package status (default: "Active")
* @param {number} parameters.iCredits - Credits available (default: 1000)
* @param {number} parameters.iCreditsUsed - Credits used (default: 0)
* @param {number} parameters.iMultiplier - Token multiplier (default: 1000)
* @param {number} parameters.iTokens - Total tokens (default: 1000000)
* @param {number} parameters.iTokensUsed - Tokens used (default: 0)
* @param {string} parameters.objPreferences - User preferences as JSON
* @returns {Promise<models.usr_SP_user_mergeReturnModel[]>} The result of the stored procedure
*/
async usr_SP_user_merge(parameters = {}) {
  return await database.using(async function (pool) {
    const currentDateTime = new Date();
    
    // Check if this is an update (iId > 0) or insert (iId = -1)
    if (parameters.iId > 0) {
      // Update existing user
      await pool
        .request()
        .input("iId", sql.Int, parameters.iId)
        .input("sName", sql.NVarChar(100), parameters.sName)
        .input("sEmail", sql.NVarChar(100), parameters.sEmail)
        .input("sPassword", sql.NVarChar(100), parameters.sPassword)
        .input("sProfilePicture", sql.NVarChar(255), parameters.sProfilePicture)
        .input("sLada", sql.NVarChar(10), parameters.sLada || null)
        .input("sPhoneNumber", sql.NVarChar(20), parameters.sPhoneNumber || null)
        .input("iPackageId", sql.Int, parameters.iPackageId || 0)
        .input("sPackageName", sql.NVarChar(100), parameters.sPackageName || "trial")
        .input("sPackageInterval", sql.NVarChar(50), parameters.sPackageInterval || "month")
        .input("sPackageStatus", sql.NVarChar(50), parameters.sPackageStatus || "Active")
        .input("iCredits", sql.Int, parameters.iCredits || 1000)
        .input("iCreditsUsed", sql.Int, parameters.iCreditsUsed || 0)
        .input("iMultiplier", sql.Int, parameters.iMultiplier || 1000)
        .input("iTokens", sql.BigInt, parameters.iTokens || 1000000)
        .input("iTokensUsed", sql.BigInt, parameters.iTokensUsed || 0)
        .input("objPreferences", sql.NVarChar(sql.MAX), parameters.objPreferences || '')
        .query(`
          UPDATE usr.users 
          SET 
            sName = @sName,
            sEmail = @sEmail,
            sPassword = @sPassword,
            sProfilePicture = @sProfilePicture,
            sLada = @sLada,
            sPhoneNumber = @sPhoneNumber,
            iPackageId = @iPackageId,
            sPackageName = @sPackageName,
            sPackageInterval = @sPackageInterval,
            sPackageStatus = @sPackageStatus,
            iCredits = @iCredits,
            iCreditsUsed = @iCreditsUsed,
            iMultiplier = @iMultiplier,
            iTokens = @iTokens,
            iTokensUsed = @iTokensUsed,
            objPreferences = @objPreferences,
            dtModificationDate = SYSDATETIME()
          WHERE iId = @iId
        `);

      // Return updated user
      const result = await pool
        .request()
        .input("iId", sql.Int, parameters.iId)
        .query("SELECT * FROM usr.vw_users WHERE iId = @iId");
      
      return result.recordset;
    } else {
      // Insert new user (iId = -1)
      const insertResult = await pool
        .request()
        .input("sName", sql.NVarChar(100), parameters.sName)
        .input("sEmail", sql.NVarChar(100), parameters.sEmail)
        .input("sPassword", sql.NVarChar(100), parameters.sPassword)
        .input("sProfilePicture", sql.NVarChar(255), parameters.sProfilePicture)
        .input("sLada", sql.NVarChar(10), parameters.sLada || null)
        .input("sPhoneNumber", sql.NVarChar(20), parameters.sPhoneNumber || null)
        .input("iPackageId", sql.Int, parameters.iPackageId || 0)
        .input("sPackageName", sql.NVarChar(100), parameters.sPackageName || "trial")
        .input("sPackageInterval", sql.NVarChar(50), parameters.sPackageInterval || "month")
        .input("sPackageStatus", sql.NVarChar(50), parameters.sPackageStatus || "Active")
        .input("iCredits", sql.Int, parameters.iCredits || 1000)
        .input("iCreditsUsed", sql.Int, parameters.iCreditsUsed || 0)
        .input("iMultiplier", sql.Int, parameters.iMultiplier || 1000)
        .input("iTokens", sql.BigInt, parameters.iTokens || 1000000)
        .input("iTokensUsed", sql.BigInt, parameters.iTokensUsed || 0)
        .input("objPreferences", sql.NVarChar(sql.MAX), parameters.objPreferences || '')
        .query(`
          INSERT INTO usr.users (
            sName, sEmail, sPassword, sProfilePicture, sLada, sPhoneNumber,
            iPackageId, sPackageName, sPackageInterval, sPackageStatus,
            dtPackageRegDate, dtPackageNextDueDate,
            iCredits, iCreditsUsed, iMultiplier, iTokens, iTokensUsed,
            objPreferences, dtRegistrationDate, dtModificationDate,
            sIdExternalProvider, iIdRegistrationProvider
          )
          OUTPUT INSERTED.iId
          VALUES (
            @sName, @sEmail, @sPassword, @sProfilePicture, @sLada, @sPhoneNumber,
            @iPackageId, @sPackageName, @sPackageInterval, @sPackageStatus,
            SYSDATETIME(), DATEADD(MONTH, 1, SYSDATETIME()),
            @iCredits, @iCreditsUsed, @iMultiplier, @iTokens, @iTokensUsed,
            @objPreferences, SYSDATETIME(), SYSDATETIME(),
            NULL, NULL
          )
        `);

      const newUserId = insertResult.recordset[0].iId;

      // Return new user data
      const result = await pool
        .request()
        .input("iId", sql.Int, newUserId)
        .query("SELECT * FROM usr.vw_users WHERE iId = @iId");
      
      return result.recordset;
    }
  });
}


/**
* @function usr_SP_userAdditionalInfo_merge
* @description Execute stored procedure usr_SP_userAdditionalInfo_merge
* @param {Object} parameters 
* @param {number} parameters.iIdUser - Required
* @param {number} parameters.iMeasureType - Required
* @param {number} parameters.dHeightM - Required
* @param {number} parameters.dWeightKG - Required
* @param {string} parameters.sLanguage - Required 
* @returns {Promise<models.usr_SP_userAdditionalInfo_mergeReturnModel[]>} The result of the stored procedure
*/
async usr_SP_userAdditionalInfo_merge(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.input("iMeasureType", sql.Int, parameters.iMeasureType)
			.input("dHeightM", sql.Decimal(18,6), parameters.dHeightM)
			.input("dWeightKG", sql.Decimal(18,6), parameters.dWeightKG)
			.input("sLanguage", sql.NVarChar, parameters.sLanguage)
			.execute("usr.SP_userAdditionalInfo_merge");
		return result.recordset;
	});
}


/**
* @function usr_SP_userDevices_merge
* @description Execute stored procedure usr_SP_userDevices_merge
* @param {Object} parameters 
* @param {number} parameters.iIdUser - Required
* @param {string} parameters.sIdProvider - Required
* @param {number} parameters.iIdProvider - Required
* @param {string} parameters.sName - Required 
* @returns {Promise<models.usr_SP_userDevices_mergeReturnModel[]>} The result of the stored procedure
*/
async usr_SP_userDevices_merge(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.input("sIdProvider", sql.NVarChar, parameters.sIdProvider)
			.input("iIdProvider", sql.Int, parameters.iIdProvider)
			.input("sName", sql.NVarChar, parameters.sName)
			.execute("usr.SP_userDevices_merge");
		return result.recordset;
	});
}


/**
* @function usr_SP_userMemories_merge
* @description Execute stored procedure usr_SP_userMemories_merge
* @param {Object} parameters 
* @param {number} parameters.iIdUser - Required
* @param {number} parameters.iOrder - Required
* @param {number} parameters.dHeightInch - Required 
* @returns {Promise<models.usr_SP_userMemories_mergeReturnModel[]>} The result of the stored procedure
*/
async usr_SP_userMemories_merge(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.input("iOrder", sql.Int, parameters.iOrder)
			.input("dHeightInch", sql.Decimal(18,6), parameters.dHeightInch)
			.execute("usr.SP_userMemories_merge");
		return result.recordset;
	});
}


/**
* @function config_SP_userSettings_merge
* @description Execute stored procedure config_SP_userSettings_merge
* @param {Object} parameters 
* @param {number} parameters.iIdUser - Required
* @param {number} parameters.iIdLanguage - Required
* @param {number} parameters.iViewMode - Required
* @param {boolean} parameters.bSedentaryNotification - Required 
* @returns {Promise<models.config_SP_userSettings_mergeReturnModel[]>} The result of the stored procedure
*/
async config_SP_userSettings_merge(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.input("iIdLanguage", sql.Int, parameters.iIdLanguage)
			.input("iViewMode", sql.Int, parameters.iViewMode)
			.input("bSedentaryNotification", sql.Bit, parameters.bSedentaryNotification)
			.execute("config.SP_userSettings_merge");
		return result.recordset;
	});
}


/**
* @function report_ValidateClosedRoutines
* @description Execute stored procedure report_ValidateClosedRoutines
* @param {Object} parameters 
* @param {number} parameters.iIdUser - Required 
* @returns {Promise<models.report_ValidateClosedRoutinesReturnModel[]>} The result of the stored procedure
*/
async report_ValidateClosedRoutines(parameters = {}) {
	return await database.using(async function(pool) {
		const result = await pool
			.request()
			.input("iIdUser", sql.Int, parameters.iIdUser)
			.execute("report.ValidateClosedRoutines");
		return result.recordset;
	});
}


}
module.exports = new databaseStoreProcedures();