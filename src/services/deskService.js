const { report_userMovementHistory, desk_desks,usr_routine} = require("@database/SQL/auto/databaseModels");
const { report_SP_create_userMovementHistory,desk_SP_Conexion,usr_SP_create_routine} = require("@database/SQL/auto/databaseStoreProcedures");
const Routine = require("@modelsExtras/RoutineModel");
const MovementHistory = require("@modelsExtras/MovementModel");

class DeskService {
  /**
   * GUARDA EL MOVEMENT QUE APLICAN CON MEMORIAS O SIN MEMORIAS
   * @param {MovementHistory} movement 
   * @returns {report_userMovementHistory}
   */
  async create_userMovementHistory(movement) {
    const movement_data = await report_SP_create_userMovementHistory(movement).firstOrDefault()
    return movement_data;
  }

  /**
   * Generate connection of desk
   * @returns {desk_desks}
   */
  async connection(desk) {
    const desk_data = await desk_SP_Conexion({iIdUser:desk.iIdUser,sUUID:desk.sUUID,iStatus:desk.iStatus,sDeskName:desk.sDeskName}).firstOrDefault()
    return desk_data;
  }

  /**
   * Save routines
   * @param {Routine} user 
   * @returns {usr_routine}
   */
  async create_routine(Routine) {
    const routine_data = await usr_SP_create_routine(Routine).firstOrDefault()
    // const routine_data = await usr_SP_create_routine({iId:routine.iId,iIdUser:routine.iIdUser,iDurationSeconds:routine.iDurationSeconds,iStatus:routine.iDurationSeconds,iSedentarismo:routine.iSedentarismo}).firstOrDefault()
    return routine_data;
  }

  /**
   * Adjust desk height to a target value
   * @param {Object} heightAdjustment - The height adjustment object
   * @param {number} heightAdjustment.iIdUser - User ID
   * @param {string} heightAdjustment.sUUID - Device UUID
   * @param {number} heightAdjustment.dTargetHeight - Target height in inches
   * @param {number} heightAdjustment.iMemoryPosition - Optional memory position (1-4)
   * @returns {Object} Result of the height adjustment attempt
   */
  async adjustHeight(heightAdjustment) {
    try {
      // 1. Check if the desk exists and is connected to this user
      const deskConnection = await desk_SP_Conexion({
        iIdUser: heightAdjustment.iIdUser,
        sUUID: heightAdjustment.sUUID,
        iStatus: 1, // Assuming 1 means active
        sDeskName: '' // Empty as we're just checking connection
      }).firstOrDefault();
      
      if (!deskConnection) {
        return { success: false, message: 'Desk not found or not connected to this user' };
      }
      
      // 2. Create a movement history entry to record this adjustment
      const movement = {
        iIdUserDeskHistory: heightAdjustment.iIdUser,
        dHeightInch: heightAdjustment.dTargetHeight,
        iOrder: heightAdjustment.iMemoryPosition || 0, // Use 0 if not using a memory position
        iIdRoutine: null // Assuming no routine is associated with direct height adjustment
      };
      
      const movementResult = await this.create_userMovementHistory(movement);
      
      if (!movementResult) {
        return { success: false, message: 'Failed to record movement history' };
      }
      
      // In a production system, this would communicate with the desk via Bluetooth
      // Since we're just implementing the backend API, we'll return success
      return { 
        success: true, 
        message: 'Height adjustment initiated',
        targetHeight: heightAdjustment.dTargetHeight,
        deskUUID: heightAdjustment.sUUID
      };
    } catch (error) {
      console.error('Error in adjustHeight:', error);
      return { success: false, message: 'Internal server error', error: error.message };
    }
  }

}

module.exports = new DeskService();
