const ClaimsService = require("@services/claimsService");
const deskService = require("@services/deskService");
const ValidationService = require("@services/validationService");
const DeskModel = require("@modelsExtras/DeskModel");
const MovementHistory = require("@modelsExtras/MovementModel");
const UtilsService = require("@src/services/utilsService");
const { getIO }      = require('../socketio/socket.js');
const database       = require('../database/SQL/database.js');   // singleton
const sql            = require('mssql');     

class DeskController {
  /**
   * Crea movement de todos los movimientos de la mesa
   * @type {MiddlewareFunction}
   */
  async movement(req, res, next) {
    try {
      var claims = new ClaimsService(req);
      var movement = new MovementHistory(req.body);
      movement.iIdUserDeskHistory = claims.getID();

      if (!ValidationService.isValidNumber(movement.dHeightInch))
        throw new TypeError("Height is not a number");

      if (!ValidationService.isValidNumber(movement.iOrder))
        throw new TypeError("Memory is not a number");
      var success = await deskService.create_userMovementHistory(movement);

      if (success) res.status(200).json({ result: "Movement was create" });
      else res.status(401).json({ result: "Movement was not create" });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea la conexion con la mesa
   * @type {MiddlewareFunction}
   */
  async connection(req, res, next) {
    try {
      const claims = new ClaimsService(req);
      const desk   = new DeskModel(req.body);
      desk.iIdUser = claims.getID();

      /* ───── Normalización previa ───── */
      // La app envía iStatus como string; lo convertimos a número
      if (typeof desk.iStatus === "string") {
        desk.iStatus = Number(desk.iStatus);
      }

      /* ───── Validaciones ───── */
      if (!ValidationService.isValidString(desk.sDeskName))
        throw new TypeError("sDeskName is not a string");

      if (!ValidationService.isValidString(desk.sUUID))
        throw new TypeError("sUUID is not a string");

      if (!ValidationService.isValidNumber(desk.iStatus))
        throw new TypeError("iStatus is not a number");

      if (
        desk.dMinHeightMm !== undefined &&
        !ValidationService.isValidNumber(desk.dMinHeightMm)
      )
        throw new TypeError("dMinHeightMm is not a number");

      if (
        desk.dMaxHeightMm !== undefined &&
        !ValidationService.isValidNumber(desk.dMaxHeightMm)
      )
        throw new TypeError("dMaxHeightMm is not a number");

      /* ───── Servicio ───── */
      const result = await deskService.connection(desk);

      /* ───── Respuesta ───── */
      if (result) {
        const allowedKeys = [
          "sUUID",
          "sDeskName",
          "iStatus",
          "dMinHeightMm",
          "dMaxHeightMm",
        ];
        const filteredJSON = UtilsService.filterJSON(result, allowedKeys);
        res.status(200).json({ result: filteredJSON });
      } else {
        res.status(401).json({ result: "connection was not created" });
      }
    } catch (error) {
      next(error);
    }
  }
  
   /**
   * Envía un comando de altura a la mesa (:sUUID/height)
   * @type {MiddlewareFunction}
   */
   async moveToHeight(req, res) {
    try {
      /* ───── Parámetros ───── */
      const { sUUID }   = req.params;          // UUID de la mesa
      const { targetMm } = req.body;           // Altura objetivo
      if (!ValidationService.isValidString(sUUID))
        throw new TypeError("sUUID is not a string/uuid");

      /* ───── Servicio ───── */
      const result = await database.using(async (pool) => {
        return await pool.request()
          .input('sUUID',    sql.Char(36), sUUID)   // ①  → ahora sí lo envías
          .input('targetMm', sql.Int,      targetMm)
          .execute('desk.SP_AddHeightCommand');
      });

      /* ───── Respuesta ───── */
      if (result) {
        const cmdId = result.recordset[0].cmdId;
        getIO().to(sUUID)                   // la “room” también es el UUID
              .emit('desk:height', { cmdId, targetMm });

        return res.status(201).json({ cmdId, targetMm });
      }else {
        return res.status(401).json({ result: "height command was not created" });
      }
    } catch (error) {
      console.error('DB error:', error);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  async changeDeskUUID(req, res, next) {
    try {
      const { sName, sNewUUID, dMinHeightMm, dMaxHeightMm } = req.body;

      // Validaciones básicas
      if (!ValidationService.isValidString(sName) || 
          !ValidationService.isValidString(sNewUUID) || 
          !ValidationService.isValidNumber(dMinHeightMm) ||
          !ValidationService.isValidNumber(dMaxHeightMm)){
        return res.status(400).json({ error: 'Invalid data' });
      }
      const minIntHeight = Math.round(dMinHeightMm);
      const maxIntHeight = Math.round(dMaxHeightMm);

      // 1) devolvemos el resultado del query
      const result = await database.using(async (pool) => {
        return pool.request()                     // <─ return aquí
          .input('sName',   sql.NVarChar(100), sName)
          .input('newUUID', sql.Char(36), sNewUUID)
          .input('dMinHeightMm', sql.Int, minIntHeight)
          .input('dMaxHeightMm', sql.Int, maxIntHeight)
          .query(`
            UPDATE desk.desks
            SET sUUID = @newUUID,
            minHeightMm = @dMinHeightMm,
            maxHeightMm = @dMaxHeightMm
            WHERE sDeskName = @sName
          `);
      });

      // 2) ahora result está definido
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ error: 'Desk not found' });
      }

      return res.status(200).json({ success: true, message: 'Desk UUID changed successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DeskController();
