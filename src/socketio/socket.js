// @src/socket.js
const http        = require('http');
const { Server }  = require('socket.io');
const database    = require('../database/SQL/database');   // tu singleton
const sql         = require('mssql');
const jwtService  = require('../services/jwtService');
const validationService = require('../services/validationService');

let io;                                          // referencia global

/**
 * Envuelve la app de Express en un servidor HTTP y monta Socket.io.
 * Devuelve el server para que el entrypoint haga .listen().
 */
function initSocket(app) {
  const server = http.createServer(app);

  io = new Server(server, {
    cors: { origin: process.env.CORS_ORIGIN || '*' }   // ajusta si lo restringes
  });

  io.on('connection', (socket) => {

  // La app Flutter envía el deskId para unirse a la “sala”
  socket.on('joinDesk', async ({ sUUID, sName }) => {

    console.log(`Socket ${socket.id} se unió a la sala: ${sName} con UUID: ${sUUID}`);

  // Sanea y valida UUID
  if (!validationService.isValidUuid(sUUID)) {
    return socket.emit('error', 'invalid-uuid');
  }

  socket.join(deskName);

  //UPSERT seguro
  try {
    await database.using(async (pool) => {
      await pool.request()
        .input('name', sql.VarChar, sName)
        .input('uuid', sql.VarChar, sUUID)
        .query(`
          MERGE desk.desks AS t
          USING (SELECT @deskName AS sDeskName, @uuid AS sUUID) AS src
          ON (t.sDeskName = src.sDeskName)
          WHEN MATCHED THEN
          UPDATE SET t.sUUID = src.sUUID, t.dtLastConnection = SYSUTCDATETIME()
        `);
    });
  } catch (err) {
    console.error('Upsert error:', err);
  }
  console.log("No hay fallo en la conexión de socket");
});

    // ACK: la app confirma que terminó el movimiento
    socket.on('desk:ack', async ({ cmdId }) => {
      try {
        await database.using(async (pool) => {
          await pool.request()
            .input('cmdId', sql.Int, cmdId)
            .query(`
              UPDATE desk.deskHeightCommand
                 SET status = 'ack',
                     dtAck  = SYSDATETIME()
               WHERE iId = @cmdId
            `);
        });
      } catch (err) {
        console.error('ACK update error:', err);
      }
    });

  });

  return server;
}

/** Obtén la instancia para emitir eventos desde las rutas */
function getIO() {
  if (!io) throw new Error('Socket.io no está inicializado');
  return io;
}

module.exports = { initSocket, getIO };
