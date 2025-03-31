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

}

module.exports = new DeskService();
