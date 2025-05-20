// @src/socket.js
const http        = require('http');
const { Server }  = require('socket.io');
const database    = require('../database/SQL/database');   // tu singleton
const sql         = require('mssql');

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
    socket.on('joinDesk', (sUUID) => {
      console.log(`joinDesk sUUID recibido: ${sUUID}`);
      socket.join(sUUID);
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
