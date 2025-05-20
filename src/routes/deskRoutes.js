const { param, body, validationResult } = require('express-validator');
const database       = require('../database/SQL/database');   // singleton
const sql            = require('mssql');                      // driver
const { getIO }      = require('../socketio/socket.js');

module.exports = function AuthRoutes() {
  const express = require("express");
  const deskController = require("@controllers/deskController");

  const router = express.Router();
  router.post("/movement", deskController.movement);
  router.post("/conexion", deskController.connection);
  
  /*Perdonenme por esta atrocidad*/
  router.post(
    '/:sUUID/height',                       // ← en la ruta
    [
      param('sUUID').isUUID('all'),
      body('targetMm').isInt({ min: 300 }).toInt()   // rango lo valida el SP
    ],
    async (req, res) => {
      const { sUUID }   = req.params;       // ← aquí lo obtienes
      const { targetMm } = req.body;

      try {
        const result = await database.using(async (pool) => {
          return await pool.request()
            .input('sUUID',    sql.Char(36), sUUID)   // ①  → ahora sí lo envías
            .input('targetMm', sql.Int,      targetMm)
            .execute('desk.SP_AddHeightCommand');
        });

        const cmdId = result.recordset[0].cmdId;

        getIO().to(sUUID)                   // la “room” también es el UUID
              .emit('desk:height', { cmdId, targetMm });

        return res.status(201).json({ cmdId, targetMm });
      } catch (err) {
        console.error('DB error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
    }
  );


  return router;
};
