/**
* @class desk_SP_ConexionReturnModel
* @description Represents a table desk_SP_ConexionReturnModel with its columns
*/
class desk_SP_ConexionReturnModel {
	/**
	 * Create an instance of the desk_SP_ConexionReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iCategory - Required
	 * @param {string} conditions.sDeskName - Required
	 * @param {string} conditions.sUUID - Required
	 * @param {number} conditions.iStatus - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {number} conditions.iIdUserLastConnected - Required
	 * @param {Date} conditions.dtLastConnection - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iCategory = conditions.iCategory;
		this.sDeskName = conditions.sDeskName;
		this.sUUID = conditions.sUUID;
		this.iStatus = conditions.iStatus;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.iIdUserLastConnected = conditions.iIdUserLastConnected;
		this.dtLastConnection = conditions.dtLastConnection;
		
	}
}

/**
* @class usr_SP_create_routineReturnModel
* @description Represents a table usr_SP_create_routineReturnModel with its columns
*/
class usr_SP_create_routineReturnModel {
	/**
	 * Create an instance of the usr_SP_create_routineReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUser - Required
	 * @param {string} conditions.sRoutineName - Required
	 * @param {number} conditions.iDurationSeconds - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {number} conditions.iStatus - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUser = conditions.iIdUser;
		this.sRoutineName = conditions.sRoutineName;
		this.iDurationSeconds = conditions.iDurationSeconds;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.iStatus = conditions.iStatus;
		
	}
}

/**
* @class report_SP_create_userMovementHistoryReturnModel
* @description Represents a table report_SP_create_userMovementHistoryReturnModel with its columns
*/
class report_SP_create_userMovementHistoryReturnModel {
	/**
	 * Create an instance of the report_SP_create_userMovementHistoryReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUserDeskHistory - Required
	 * @param {number} conditions.iIdRoutine - Required
	 * @param {number} conditions.dHeightInch - Required
	 * @param {number} conditions.iOrder - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUserDeskHistory = conditions.iIdUserDeskHistory;
		this.iIdRoutine = conditions.iIdRoutine;
		this.dHeightInch = conditions.dHeightInch;
		this.iOrder = conditions.iOrder;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		
	}
}

/**
* @class desk_SP_desks_mergeReturnModel
* @description Represents a table desk_SP_desks_mergeReturnModel with its columns
*/
class desk_SP_desks_mergeReturnModel {
	/**
	 * Create an instance of the desk_SP_desks_mergeReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		
	}
}

/**
* @class usr_SP_gerRoutinesReturnModel
* @description Represents a table usr_SP_gerRoutinesReturnModel with its columns
*/
class usr_SP_gerRoutinesReturnModel {
	/**
	 * Create an instance of the usr_SP_gerRoutinesReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUser - Required
	 * @param {string} conditions.sRoutineName - Required
	 * @param {number} conditions.iDurationSeconds - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {number} conditions.iStatus - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUser = conditions.iIdUser;
		this.sRoutineName = conditions.sRoutineName;
		this.iDurationSeconds = conditions.iDurationSeconds;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.iStatus = conditions.iStatus;
		
	}
}

/**
* @class usr_SP_getDevicesReturnModel
* @description Represents a table usr_SP_getDevicesReturnModel with its columns
*/
class usr_SP_getDevicesReturnModel {
	/**
	 * Create an instance of the usr_SP_getDevicesReturnModel class.
	 * @param {Object} conditions 
	 * @param {string} conditions.sName - Required
	 * @param {string} conditions.sIdProvider - Required
	 * @param {number} conditions.iStatus - Required
	
	 */
	constructor(conditions = {}) {
		this.sName = conditions.sName;
		this.sIdProvider = conditions.sIdProvider;
		this.iStatus = conditions.iStatus;
		
	}
}

/**
* @class usr_SP_getUsersReturnModel
* @description Represents a table usr_SP_getUsersReturnModel with its columns
*/
class usr_SP_getUsersReturnModel {
	/**
	 * Create an instance of the usr_SP_getUsersReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {string} conditions.sName - Required
	 * @param {string} conditions.sEmail - Required
	 * @param {number} conditions.iViewMode - Required
	 * @param {string} conditions.sViewMode - Required
	 * @param {number} conditions.iIdLanguage - Required
	 * @param {string} conditions.sLanguage - Required
	 * @param {number} conditions.dWeightKG - Required
	 * @param {number} conditions.dHeightM - Required
	 * @param {number} conditions.iMeasureType - Required
	 * @param {string} conditions.sMeasureType - Required
	 * @param {string} conditions.objMemories - Required
	 * @param {string} conditions.objRoutine - Required
	 * @param {string} conditions.lastRoutine - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.sName = conditions.sName;
		this.sEmail = conditions.sEmail;
		this.iViewMode = conditions.iViewMode;
		this.sViewMode = conditions.sViewMode;
		this.iIdLanguage = conditions.iIdLanguage;
		this.sLanguage = conditions.sLanguage;
		this.dWeightKG = conditions.dWeightKG;
		this.dHeightM = conditions.dHeightM;
		this.iMeasureType = conditions.iMeasureType;
		this.sMeasureType = conditions.sMeasureType;
		this.objMemories = conditions.objMemories;
		this.objRoutine = conditions.objRoutine;
		this.lastRoutine = conditions.lastRoutine;
		
	}
}

/**
* @class usr_SP_goal_getReturnModel
* @description Represents a table usr_SP_goal_getReturnModel with its columns
*/
class usr_SP_goal_getReturnModel {
	/**
	 * Create an instance of the usr_SP_goal_getReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUser - Required
	 * @param {number} conditions.iStandingTimeSeconds - Required
	 * @param {number} conditions.iSittingTimeSeconds - Required
	 * @param {number} conditions.iCaloriesToBurn - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {Date} conditions.dtModificationDate - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUser = conditions.iIdUser;
		this.iStandingTimeSeconds = conditions.iStandingTimeSeconds;
		this.iSittingTimeSeconds = conditions.iSittingTimeSeconds;
		this.iCaloriesToBurn = conditions.iCaloriesToBurn;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.dtModificationDate = conditions.dtModificationDate;
		
	}
}

/**
* @class usr_SP_goals_mergeReturnModel
* @description Represents a table usr_SP_goals_mergeReturnModel with its columns
*/
class usr_SP_goals_mergeReturnModel {
	/**
	 * Create an instance of the usr_SP_goals_mergeReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUser - Required
	 * @param {number} conditions.iStandingTimeSeconds - Required
	 * @param {number} conditions.iSittingTimeSeconds - Required
	 * @param {number} conditions.iCaloriesToBurn - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {Date} conditions.dtModificationDate - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUser = conditions.iIdUser;
		this.iStandingTimeSeconds = conditions.iStandingTimeSeconds;
		this.iSittingTimeSeconds = conditions.iSittingTimeSeconds;
		this.iCaloriesToBurn = conditions.iCaloriesToBurn;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.dtModificationDate = conditions.dtModificationDate;
		
	}
}

/**
* @class config_SP_parameters_mergeReturnModel
* @description Represents a table config_SP_parameters_mergeReturnModel with its columns
*/
class config_SP_parameters_mergeReturnModel {
	/**
	 * Create an instance of the config_SP_parameters_mergeReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		
	}
}

/**
* @class report_SP_start_routineUserReturnModel
* @description Represents a table report_SP_start_routineUserReturnModel with its columns
*/
class report_SP_start_routineUserReturnModel {
	/**
	 * Create an instance of the report_SP_start_routineUserReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUser - Required
	 * @param {number} conditions.iStatus - Required
	 * @param {number} conditions.bCompleteRoutine - Required
	 * @param {number} conditions.iDurationSecondsTarget - Required
	 * @param {Date} conditions.dtStartDate - Required
	 * @param {Date} conditions.dtEndDate - Required
	 * @param {Date} conditions.dtEndDate_Stop - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUser = conditions.iIdUser;
		this.iStatus = conditions.iStatus;
		this.bCompleteRoutine = conditions.bCompleteRoutine;
		this.iDurationSecondsTarget = conditions.iDurationSecondsTarget;
		this.dtStartDate = conditions.dtStartDate;
		this.dtEndDate = conditions.dtEndDate;
		this.dtEndDate_Stop = conditions.dtEndDate_Stop;
		
	}
}

/**
* @class usr_SP_User_deleteReturnModel
* @description Represents a table usr_SP_User_deleteReturnModel with its columns
*/
class usr_SP_User_deleteReturnModel {
	/**
	 * Create an instance of the usr_SP_User_deleteReturnModel class.
	 * @param {Object} conditions 
	 * @param {boolean} conditions.bActive - Required
	
	 */
	constructor(conditions = {}) {
		this.bActive = conditions.bActive;
		
	}
}

/**
* @class usr_SP_user_loginReturnModel
* @description Represents a table usr_SP_user_loginReturnModel with its columns
*/
class usr_SP_user_loginReturnModel {
	/**
	 * Create an instance of the usr_SP_user_loginReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {string} conditions.sName - Required
	 * @param {string} conditions.sEmail - Required
	 * @param {string} conditions.sPassword - Required
	 * @param {string} conditions.sProfilePicture - Required
	 * @param {string} conditions.sPhoneNumber - Required
	 * @param {string} conditions.sLada - Required
	 * @param {string} conditions.sIdExternalProvider - Required
	 * @param {number} conditions.iIdRegistrationProvider - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {Date} conditions.dtModificationDate - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.sName = conditions.sName;
		this.sEmail = conditions.sEmail;
		this.sPassword = conditions.sPassword;
		this.sProfilePicture = conditions.sProfilePicture;
		this.sPhoneNumber = conditions.sPhoneNumber;
		this.sLada = conditions.sLada;
		this.sIdExternalProvider = conditions.sIdExternalProvider;
		this.iIdRegistrationProvider = conditions.iIdRegistrationProvider;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.dtModificationDate = conditions.dtModificationDate;
		
	}
}

/**
* @class usr_SP_user_mergeReturnModel
* @description Represents a table usr_SP_user_mergeReturnModel with its columns
*/
class usr_SP_user_mergeReturnModel {
	/**
	 * Create an instance of the usr_SP_user_mergeReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {string} conditions.sName - Required
	 * @param {string} conditions.sEmail - Required
	 * @param {number} conditions.iViewMode - Required
	 * @param {string} conditions.sViewMode - Required
	 * @param {number} conditions.iIdLanguage - Required
	 * @param {string} conditions.sLanguage - Required
	 * @param {number} conditions.dWeightKG - Required
	 * @param {number} conditions.dHeightM - Required
	 * @param {number} conditions.iMeasureType - Required
	 * @param {string} conditions.sMeasureType - Required
	 * @param {string} conditions.objMemories - Required
	 * @param {string} conditions.objRoutine - Required
	 * @param {string} conditions.lastRoutine - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.sName = conditions.sName;
		this.sEmail = conditions.sEmail;
		this.iViewMode = conditions.iViewMode;
		this.sViewMode = conditions.sViewMode;
		this.iIdLanguage = conditions.iIdLanguage;
		this.sLanguage = conditions.sLanguage;
		this.dWeightKG = conditions.dWeightKG;
		this.dHeightM = conditions.dHeightM;
		this.iMeasureType = conditions.iMeasureType;
		this.sMeasureType = conditions.sMeasureType;
		this.objMemories = conditions.objMemories;
		this.objRoutine = conditions.objRoutine;
		this.lastRoutine = conditions.lastRoutine;
		
	}
}

/**
* @class usr_SP_userAdditionalInfo_mergeReturnModel
* @description Represents a table usr_SP_userAdditionalInfo_mergeReturnModel with its columns
*/
class usr_SP_userAdditionalInfo_mergeReturnModel {
	/**
	 * Create an instance of the usr_SP_userAdditionalInfo_mergeReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		
	}
}

/**
* @class usr_SP_userMemories_mergeReturnModel
* @description Represents a table usr_SP_userMemories_mergeReturnModel with its columns
*/
class usr_SP_userMemories_mergeReturnModel {
	/**
	 * Create an instance of the usr_SP_userMemories_mergeReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iOrder - Required
	 * @param {number} conditions.dHeightInch - Required
	
	 */
	constructor(conditions = {}) {
		this.iOrder = conditions.iOrder;
		this.dHeightInch = conditions.dHeightInch;
		
	}
}

/**
* @class config_SP_userSettings_mergeReturnModel
* @description Represents a table config_SP_userSettings_mergeReturnModel with its columns
*/
class config_SP_userSettings_mergeReturnModel {
	/**
	 * Create an instance of the config_SP_userSettings_mergeReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iIdUser - Required
	
	 */
	constructor(conditions = {}) {
		this.iIdUser = conditions.iIdUser;
		
	}
}

/**
* @class report_ValidateClosedRoutinesReturnModel
* @description Represents a table report_ValidateClosedRoutinesReturnModel with its columns
*/
class report_ValidateClosedRoutinesReturnModel {
	/**
	 * Create an instance of the report_ValidateClosedRoutinesReturnModel class.
	 * @param {Object} conditions 
	 * @param {number} conditions.IdUser - Required
	 * @param {number} conditions.IdRutina - Required
	 * @param {string} conditions.Descripcion - Required
	 * @param {string} conditions.Titulo - Required
	 * @param {string} conditions.Token - Required
	
	 */
	constructor(conditions = {}) {
		this.IdUser = conditions.IdUser;
		this.IdRutina = conditions.IdRutina;
		this.Descripcion = conditions.Descripcion;
		this.Titulo = conditions.Titulo;
		this.Token = conditions.Token;
		
	}
}

/**
* @class desk_desks
* @description Represents a table desk_desks with its columns
*/
class desk_desks {
	/**
	 * Create an instance of the desk_desks class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iCategory - Required
	 * @param {string} conditions.sDeskName - Required
	 * @param {string} conditions.sUUID - Required
	 * @param {number} conditions.iStatus - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {number} conditions.iIdUserLastConnected - Required
	 * @param {Date} conditions.dtLastConnection - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iCategory = conditions.iCategory;
		this.sDeskName = conditions.sDeskName;
		this.sUUID = conditions.sUUID;
		this.iStatus = conditions.iStatus;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.iIdUserLastConnected = conditions.iIdUserLastConnected;
		this.dtLastConnection = conditions.dtLastConnection;
		
	}
}

/**
* @class usr_goals
* @description Represents a table usr_goals with its columns
*/
class usr_goals {
	/**
	 * Create an instance of the usr_goals class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUser - Required
	 * @param {number} conditions.iStandingTimeSeconds - Required
	 * @param {number} conditions.iSittingTimeSeconds - Required
	 * @param {number} conditions.iCaloriesToBurn - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {Date} conditions.dtModificationDate - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUser = conditions.iIdUser;
		this.iStandingTimeSeconds = conditions.iStandingTimeSeconds;
		this.iSittingTimeSeconds = conditions.iSittingTimeSeconds;
		this.iCaloriesToBurn = conditions.iCaloriesToBurn;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.dtModificationDate = conditions.dtModificationDate;
		
	}
}

/**
* @class config_parameters
* @description Represents a table config_parameters with its columns
*/
class config_parameters {
	/**
	 * Create an instance of the config_parameters class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {string} conditions.sKey - Required
	 * @param {string} conditions.sDescription - Required
	 * @param {string} conditions.sValue - Required
	 * @param {number} conditions.iValue - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {number} conditions.iIdUserRegistration - Required
	 * @param {Date} conditions.dtModificationDate - Required
	 * @param {number} conditions.iIdUserModification - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.sKey = conditions.sKey;
		this.sDescription = conditions.sDescription;
		this.sValue = conditions.sValue;
		this.iValue = conditions.iValue;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.iIdUserRegistration = conditions.iIdUserRegistration;
		this.dtModificationDate = conditions.dtModificationDate;
		this.iIdUserModification = conditions.iIdUserModification;
		
	}
}

/**
* @class report_performanceHistory
* @description Represents a table report_performanceHistory with its columns
*/
class report_performanceHistory {
	/**
	 * Create an instance of the report_performanceHistory class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iStandingTimeSecondsTarget - Required
	 * @param {number} conditions.iSittingTimeSecondsTarget - Required
	 * @param {number} conditions.iCaloriesToBurnTarget - Required
	 * @param {number} conditions.iStandingTimeSeconds - Required
	 * @param {number} conditions.iSittingTimeSeconds - Required
	 * @param {number} conditions.iCaloriesBurned - Required
	 * @param {string} conditions.iMemories - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iStandingTimeSecondsTarget = conditions.iStandingTimeSecondsTarget;
		this.iSittingTimeSecondsTarget = conditions.iSittingTimeSecondsTarget;
		this.iCaloriesToBurnTarget = conditions.iCaloriesToBurnTarget;
		this.iStandingTimeSeconds = conditions.iStandingTimeSeconds;
		this.iSittingTimeSeconds = conditions.iSittingTimeSeconds;
		this.iCaloriesBurned = conditions.iCaloriesBurned;
		this.iMemories = conditions.iMemories;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		
	}
}

/**
* @class usr_routine
* @description Represents a table usr_routine with its columns
*/
class usr_routine {
	/**
	 * Create an instance of the usr_routine class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUser - Required
	 * @param {string} conditions.sRoutineName - Required
	 * @param {number} conditions.iDurationSeconds - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {number} conditions.iStatus - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUser = conditions.iIdUser;
		this.sRoutineName = conditions.sRoutineName;
		this.iDurationSeconds = conditions.iDurationSeconds;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.iStatus = conditions.iStatus;
		
	}
}

/**
* @class report_routineHistory
* @description Represents a table report_routineHistory with its columns
*/
class report_routineHistory {
	/**
	 * Create an instance of the report_routineHistory class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUser - Required
	 * @param {number} conditions.iStatus - Required
	 * @param {number} conditions.bCompleteRoutine - Required
	 * @param {number} conditions.iDurationSecondsTarget - Required
	 * @param {Date} conditions.dtStartDate - Required
	 * @param {Date} conditions.dtEndDate - Required
	 * @param {Date} conditions.dtEndDate_Stop - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUser = conditions.iIdUser;
		this.iStatus = conditions.iStatus;
		this.bCompleteRoutine = conditions.bCompleteRoutine;
		this.iDurationSecondsTarget = conditions.iDurationSecondsTarget;
		this.dtStartDate = conditions.dtStartDate;
		this.dtEndDate = conditions.dtEndDate;
		this.dtEndDate_Stop = conditions.dtEndDate_Stop;
		
	}
}

/**
* @class usr_userAdditionalInfo
* @description Represents a table usr_userAdditionalInfo with its columns
*/
class usr_userAdditionalInfo {
	/**
	 * Create an instance of the usr_userAdditionalInfo class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUser - Required
	 * @param {number} conditions.iMeasureType - Required
	 * @param {number} conditions.dHeightM - Required
	 * @param {number} conditions.dWeightKG - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {Date} conditions.dtModificationDate - Required
	 * @param {string} conditions.sLanguage - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUser = conditions.iIdUser;
		this.iMeasureType = conditions.iMeasureType;
		this.dHeightM = conditions.dHeightM;
		this.dWeightKG = conditions.dWeightKG;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.dtModificationDate = conditions.dtModificationDate;
		this.sLanguage = conditions.sLanguage;
		
	}
}

/**
* @class usr_userDesk
* @description Represents a table usr_userDesk with its columns
*/
class usr_userDesk {
	/**
	 * Create an instance of the usr_userDesk class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUser - Required
	 * @param {number} conditions.iIdDesk - Required
	 * @param {number} conditions.iStatus - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUser = conditions.iIdUser;
		this.iIdDesk = conditions.iIdDesk;
		this.iStatus = conditions.iStatus;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		
	}
}

/**
* @class report_userDeskHistory
* @description Represents a table report_userDeskHistory with its columns
*/
class report_userDeskHistory {
	/**
	 * Create an instance of the report_userDeskHistory class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUser - Required
	 * @param {number} conditions.iIdDesk - Required
	 * @param {string} conditions.sDeskName - Required
	 * @param {Date} conditions.dtConnectionDate - Required
	 * @param {Date} conditions.dtLastConnection - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUser = conditions.iIdUser;
		this.iIdDesk = conditions.iIdDesk;
		this.sDeskName = conditions.sDeskName;
		this.dtConnectionDate = conditions.dtConnectionDate;
		this.dtLastConnection = conditions.dtLastConnection;
		
	}
}

/**
* @class usr_userDevices
* @description Represents a table usr_userDevices with its columns
*/
class usr_userDevices {
	/**
	 * Create an instance of the usr_userDevices class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUser - Required
	 * @param {string} conditions.sIdProvider - Required
	 * @param {number} conditions.iIdProvider - Required
	 * @param {string} conditions.sName - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {number} conditions.iStatus - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUser = conditions.iIdUser;
		this.sIdProvider = conditions.sIdProvider;
		this.iIdProvider = conditions.iIdProvider;
		this.sName = conditions.sName;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.iStatus = conditions.iStatus;
		
	}
}

/**
* @class usr_userMemories
* @description Represents a table usr_userMemories with its columns
*/
class usr_userMemories {
	/**
	 * Create an instance of the usr_userMemories class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUser - Required
	 * @param {number} conditions.iOrder - Required
	 * @param {number} conditions.dHeightInch - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {Date} conditions.dtModificationDate - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUser = conditions.iIdUser;
		this.iOrder = conditions.iOrder;
		this.dHeightInch = conditions.dHeightInch;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.dtModificationDate = conditions.dtModificationDate;
		
	}
}

/**
* @class report_userMovementHistory
* @description Represents a table report_userMovementHistory with its columns
*/
class report_userMovementHistory {
	/**
	 * Create an instance of the report_userMovementHistory class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUserDeskHistory - Required
	 * @param {number} conditions.iIdRoutine - Required
	 * @param {number} conditions.dHeightInch - Required
	 * @param {number} conditions.iOrder - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUserDeskHistory = conditions.iIdUserDeskHistory;
		this.iIdRoutine = conditions.iIdRoutine;
		this.dHeightInch = conditions.dHeightInch;
		this.iOrder = conditions.iOrder;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		
	}
}

/**
* @class usr_users
* @description Represents a table usr_users with its columns
*/
class usr_users {
	/**
	 * Create an instance of the usr_users class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {string} conditions.sName - Required
	 * @param {string} conditions.sEmail - Required
	 * @param {string} conditions.sPassword - Required
	 * @param {string} conditions.sProfilePicture - Required
	 * @param {string} conditions.sPhoneNumber - Required
	 * @param {string} conditions.sLada - Required
	 * @param {string} conditions.sIdExternalProvider - Required
	 * @param {number} conditions.iIdRegistrationProvider - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {Date} conditions.dtModificationDate - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.sName = conditions.sName;
		this.sEmail = conditions.sEmail;
		this.sPassword = conditions.sPassword;
		this.sProfilePicture = conditions.sProfilePicture;
		this.sPhoneNumber = conditions.sPhoneNumber;
		this.sLada = conditions.sLada;
		this.sIdExternalProvider = conditions.sIdExternalProvider;
		this.iIdRegistrationProvider = conditions.iIdRegistrationProvider;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.dtModificationDate = conditions.dtModificationDate;
		
	}
}

/**
* @class report_userSedentarismoNotification
* @description Represents a table report_userSedentarismoNotification with its columns
*/
class report_userSedentarismoNotification {
	/**
	 * Create an instance of the report_userSedentarismoNotification class.
	 * @param {Object} conditions 
	 * @param {string} conditions.iIdUser - Required
	 * @param {string} conditions.iNotification - Required
	 * @param {string} conditions.sNameNotification - Required
	
	 */
	constructor(conditions = {}) {
		this.iIdUser = conditions.iIdUser;
		this.iNotification = conditions.iNotification;
		this.sNameNotification = conditions.sNameNotification;
		
	}
}

/**
* @class config_userSettings
* @description Represents a table config_userSettings with its columns
*/
class config_userSettings {
	/**
	 * Create an instance of the config_userSettings class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iIdUser - Required
	 * @param {number} conditions.iIdLanguage - Required
	 * @param {number} conditions.iViewMode - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {Date} conditions.dtModificationDate - Required
	 * @param {boolean} conditions.bSedentaryNotification - Required
	
	 */
	constructor(conditions = {}) {
		this.iIdUser = conditions.iIdUser;
		this.iIdLanguage = conditions.iIdLanguage;
		this.iViewMode = conditions.iViewMode;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.dtModificationDate = conditions.dtModificationDate;
		this.bSedentaryNotification = conditions.bSedentaryNotification;
		
	}
}

/**
* @class usr_userXDesks
* @description Represents a table usr_userXDesks with its columns
*/
class usr_userXDesks {
	/**
	 * Create an instance of the usr_userXDesks class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iUserId - Required
	 * @param {string} conditions.sUUID - Required
	 * @param {string} conditions.sTableName - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
	 * @param {Date} conditions.dtModificationDate - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iUserId = conditions.iUserId;
		this.sUUID = conditions.sUUID;
		this.sTableName = conditions.sTableName;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
		this.dtModificationDate = conditions.dtModificationDate;
		
	}
}

/**
* @class usr_vw_users
* @description Represents a table usr_vw_users with its columns
*/
class usr_vw_users {
	/**
	 * Create an instance of the usr_vw_users class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {string} conditions.sName - Required
	 * @param {string} conditions.sEmail - Required
	 * @param {number} conditions.iViewMode - Required
	 * @param {string} conditions.sViewMode - Required
	 * @param {number} conditions.iIdLanguage - Required
	 * @param {string} conditions.sLanguage - Required
	 * @param {number} conditions.dWeightKG - Required
	 * @param {number} conditions.dHeightM - Required
	 * @param {number} conditions.iMeasureType - Required
	 * @param {string} conditions.sMeasureType - Required
	 * @param {string} conditions.objMemories - Required
	 * @param {string} conditions.objRoutine - Required
	 * @param {string} conditions.lastRoutine - Required
	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.sName = conditions.sName;
		this.sEmail = conditions.sEmail;
		this.iViewMode = conditions.iViewMode;
		this.sViewMode = conditions.sViewMode;
		this.iIdLanguage = conditions.iIdLanguage;
		this.sLanguage = conditions.sLanguage;
		this.dWeightKG = conditions.dWeightKG;
		this.dHeightM = conditions.dHeightM;
		this.iMeasureType = conditions.iMeasureType;
		this.sMeasureType = conditions.sMeasureType;
		this.objMemories = conditions.objMemories;
		this.objRoutine = conditions.objRoutine;
		this.lastRoutine = conditions.lastRoutine;
		
	}
}

module.exports = {desk_SP_ConexionReturnModel,
usr_SP_create_routineReturnModel,
report_SP_create_userMovementHistoryReturnModel,
desk_SP_desks_mergeReturnModel,
usr_SP_gerRoutinesReturnModel,
usr_SP_getDevicesReturnModel,
usr_SP_getUsersReturnModel,
usr_SP_goal_getReturnModel,
usr_SP_goals_mergeReturnModel,
config_SP_parameters_mergeReturnModel,
report_SP_start_routineUserReturnModel,
usr_SP_User_deleteReturnModel,
usr_SP_user_loginReturnModel,
usr_SP_user_mergeReturnModel,
usr_SP_userAdditionalInfo_mergeReturnModel,
usr_SP_userMemories_mergeReturnModel,
config_SP_userSettings_mergeReturnModel,
report_ValidateClosedRoutinesReturnModel,
desk_desks,
usr_goals,
config_parameters,
report_performanceHistory,
usr_routine,
report_routineHistory,
usr_userAdditionalInfo,
usr_userDesk,
report_userDeskHistory,
usr_userDevices,
usr_userMemories,
report_userMovementHistory,
usr_users,
report_userSedentarismoNotification,
config_userSettings,
usr_userXDesks,
usr_vw_users }