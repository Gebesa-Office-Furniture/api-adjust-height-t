class DeskModel{
    /**
  *
  * @param {Object} desk
  * @param {number} desk.iIdUser 
  * @param {string} desk.sUUID
  * @param {string} desk.sDeskName
  * @param {number} desk.iStatus
  */
   constructor(desk={}){
       this.iIdUser = desk.iIdUser;
       this.sUUID = desk.sUUID;
       this.iStatus = desk.iStatus;
       this.sDeskName = desk.sDeskName;
       this.dMinHeight = desk.dMinHeightMm;
       this.dMaxHeight = desk.dMaxHeightMm;

   }
}
module.exports = DeskModel;