const {usr_routine,report_routineHistory} = require("@database/SQL/auto/databaseModels");
const { usr_SP_create_routine,usr_SP_gerRoutines,report_SP_start_routineUser,report_SP_stop_routineUser,report_ValidateClosedRoutines} = require("@database/SQL/auto/databaseStoreProcedures");
const {Routine,Routine_notification} = require("@modelsExtras/RoutineModel");

class RoutineService {
 
   /**
   * SAVE OR UPDATE ROUTINES
   * @param {Routine} routine 
   * @returns {usr_routine}
   */
   async create_routine(routine) {
    const routine_data = await usr_SP_create_routine(routine).firstOrDefault()
    return routine_data;
  }

   /**
   * GET ROUTINES
   * @param {Routine} routine 
   * @returns {usr_routine[]}
   */
   async get_routine(routine) {
    const routine_data = await usr_SP_gerRoutines(routine)
    return routine_data;
  }

   /**
   * START ROUTINES
   * @param {Routine} routine 
   * @returns {report_routineHistory}
   */
   async star_routine(routine) {
    const report_routine_data = await report_SP_start_routineUser(routine).firstOrDefault();
    return report_routine_data;
  }

   /**
   * STOP ROUTINES
   * @param {Routine} routine
   * @returns {report_routineHistory}
   */
   async stop_routine(routine) {
    const report_routine_data = await report_SP_stop_routineUser(routine);
    return report_routine_data;
  }

  /**
   * CLOSE ALL ACTIVES ROUTINESS
   * @returns {Routine_notification[]}
   */
  async validate_closed_routine() {
    const closed_routine_data = await report_ValidateClosedRoutines({iIdUser:-1});
    return closed_routine_data;
  }


}

module.exports = new RoutineService();
