class HeightAdjustmentModel {
    /**
     * Create an instance of the HeightAdjustmentModel class.
     * @param {Object} params 
     * @param {number} params.iIdUser - Required - User ID
     * @param {string} params.sUUID - Required - Device UUID
     * @param {number} params.dTargetHeight - Required - Target height in inches
     * @param {number} params.iMemoryPosition - Optional - Memory position (1-4) if saving position
     */
    constructor(params = {}) {
        this.iIdUser = params.iIdUser;
        this.sUUID = params.sUUID;
        this.dTargetHeight = params.dTargetHeight;
        this.iMemoryPosition = params.iMemoryPosition;
    }
}

module.exports = HeightAdjustmentModel;