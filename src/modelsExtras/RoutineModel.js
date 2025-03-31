class Routine{
    /**
  *
  * @param {Object} routine
  * @param {number} routine.iId 
  * @param {number} routine.iIdUser 
  * @param {number} routine.iSedentarismo
  * @param {number} routine.iStatus
  * @param {number} routine.iDurationSeconds
  * @param {string} routine.sRoutineName
  * 
  */
   constructor(routine={}){
       this.iId = routine.iId;
       this.iIdUser = routine.iIdUser;
       this.iIdRoutine = routine.iIdRoutine;
       this.iSedentarismo = routine.iSedentarismo;
       this.iStatus = routine.iStatus;
       this.iDurationSeconds = routine.iDurationSeconds;
       this.sRoutineName = routine.sRoutineName;
   }
}

class Routine_notification{
    /**
  *
  * @param {Object} routine
  * @param {number} routine.iId 
  * @param {number} routine.iIdUser 
  * @param {string} routine.Descripcion
  * @param {string} routine.Titulo
  * @param {string} routine.Token
  * 
  */
   constructor(routine={}){
       this.iIdUser = routine.iIdUser;
       this.iIdRoutine = routine.iIdRoutine;
       this.Descripcion = routine.Descripcion;
       this.Titulo = routine.Titulo;
       this.Token= routine.Token;
   }
}

module.exports = { Routine, Routine_notification };


