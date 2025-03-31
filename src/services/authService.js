const { usr_SP_user_loginReturnModel} = require("@database/SQL/auto/databaseModels");
const { usr_SP_user_merge, usr_SP_user_login} = require("@database/SQL/auto/databaseStoreProcedures");

class AuthService {
  /**
   * @returns {usr_SP_user_loginReturnModel}
   */
  async login(email,sPasswordHashed) {
    const user = await usr_SP_user_login({sEmail:email}).firstOrDefault()
    return user;
  }

  logout(token) {
    return true;
  }
  
  async register(user) {
    user.iId=-1;
    var userBD = await usr_SP_user_merge(user).firstOrDefault();
    userBD.objMemories = JSON.parse(userBD.objMemories); 
    userBD.objRoutine = JSON.parse(userBD.objRoutine); 
    userBD.lastRoutine = JSON.parse(userBD.lastRoutine); 
 
    return userBD;
  }
}

module.exports = new AuthService();
