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
    '/:deskId/height',
    [
      param('deskId').isInt().toInt(),
      body('targetMm').isInt({ min: 650, max: 1300 }).toInt()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      const { deskId }   = req.params;
      const { targetMm } = req.body;
  
      try {
        // Garantiza un pool conectado y reutilizable
        const result = await database.using(async (pool) => {
          return await pool.request()
            .input('iIdDesk',  sql.Int, deskId)
            .input('targetMm', sql.Int, targetMm)
            .execute('desk.SP_AddHeightCommand');
        });
  
        const cmdId = result.recordset[0].cmdId;
  
        // Emitir evento a la app
        getIO().to(String(deskId))
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
