class MovementHistory {
	/**
	 * Create an instance of the report_userMovementHistory class.
	 * @param {Object} conditions 
	 * @param {number} conditions.iId - Required
	 * @param {number} conditions.iIdUserDeskHistory - Required
	 * @param {number} conditions.dHeightInch - Required
	 * @param {number} conditions.iOrder - Required
	 * @param {Date} conditions.dtRegistrationDate - Required
     * @param {number} conditions.iIdRoutine - Required

	
	 */
	constructor(conditions = {}) {
		this.iId = conditions.iId;
		this.iIdUserDeskHistory = conditions.iIdUserDeskHistory;
		this.dHeightInch = conditions.dHeightInch;
		this.iOrder = conditions.iOrder;
		this.dtRegistrationDate = conditions.dtRegistrationDate;
        this.iIdRoutine= conditions.iIdRoutine;
		
	}
}

module.exports = MovementHistory;
