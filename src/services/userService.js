const { usr_users, usr_userMemories, usr_userAdditionalInfo } = require("@database/SQL/auto/databaseModels");
const { usr_SP_user_delete, config_SP_userSettings_merge } = require("@src/database/SQL/auto/databaseStoreProcedures");
const { usr_SP_user_merge, usr_SP_userMemories_merge, usr_SP_getUsers, usr_SP_userAdditionalInfo_merge, usr_SP_userDevices_merge, usr_SP_goals_merge, usr_SP_goal_get } = require("../database/SQL/auto/databaseStoreProcedures");

class UserService {
  /**
   * @param {usr_users} user 
   * @returns 
   */
  async updateInfo(user) {
    var success = await usr_SP_user_merge(user).firstOrDefault();
    return success.iId == user.iId;
  }
  /**
   * @param {usr_userAdditionalInfo} user 
   * @returns 
   */
  async updateAdditionalInfo(additional,settings) {
    var success = await usr_SP_userAdditionalInfo_merge(additional).firstOrDefault();
    var sucesss2 = await config_SP_userSettings_merge(settings).firstOrDefault();
    return success.iId == additional.iIdUser;
  }
  async settings(iId) {
    var settings = await usr_SP_getUsers({iId}).firstOrDefault();
    settings.objMemories = JSON.parse(settings.objMemories); 
    settings.objRoutine = JSON.parse(settings.objRoutine); 
    settings.lastRoutine = JSON.parse(settings.lastRoutine); 

    return settings;
  }
  /**
   * @param {usr_userMemories} memory 
   * @returns 
   */
  async memory(memory) {
    var success = await usr_SP_userMemories_merge(memory).firstOrDefault();
    return success.iOrder == memory.iOrder;
  }

  async suscribe(device) {
    await usr_SP_userDevices_merge(device);
    return true;
  }

  async setGoal(goal){
    await usr_SP_goals_merge(goal);
  }
  async getGoal(goal){
   var goal =  await usr_SP_goal_get(goal).firstOrDefault();

   return goal
  }
  async delete(iId){
    var success = await usr_SP_user_delete({iId}).firstOrDefault();
    return success.bActive;
  }
}

module.exports = new UserService();
