class Report{
    /**
  *
  * @param {Object} report
  * @param {number} report.iIdUser 
  * @param {number} report.sTime 
  * @param {number} report.TimeSeatedInSeconds 
  * @param {number} report.TimeStandingInSeconds 
  * @param {number} report.CaloriesBurned
  * @param {string} report.MemoriMoreUse
  * @param {number} report.iCaloriesToBurn_goal
  * @param {number} report.iSittingTimeSeconds_goal
  * @param {number} report.iStandingTimeSeconds_goal
  * 
  */
   constructor(report={}){

       this.iIdUser = report.iIdUser;
       this.sTime = report.sTime;
       this.rTimeSeatedInSecondseport = report.TimeSeatedInSeconds;
       this.TimeStandingInSeconds = report.TimeStandingInSeconds;
       this.CaloriesBurned = report.CaloriesBurned;
       this.MemoriMoreUse = report.MemoriMoreUse;
       this.iCaloriesToBurn_goal= report.iCaloriesToBurn_goal;
       this.iSittingTimeSeconds_goal= report.iSittingTimeSeconds_goal;
       this.iStandingTimeSeconds_goal= report.iStandingTimeSeconds_goal;
   }
}

module.exports = Report;

