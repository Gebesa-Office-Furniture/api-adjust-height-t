const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

class TokenService {
  constructor() {
    var dbPath = process.env.tokenpath;
    
    if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath);

    this.dbPath = dbPath + "/tokens.db";
    console.log(dbPath)
    this.db = null;
  }

  // Init Database
  initDatabase() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          console.error("Error al conectar la base de datos:", err.message);
          reject(err);
        } else {
          console.log("Conexión a SQLite establecida.");
          this.db.run(
            `CREATE TABLE IF NOT EXISTS tokens (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        username TEXT NOT NULL,
                        refreshToken TEXT NOT NULL,
                        status INTEGER DEFAULT 1, -- 1 para activo, 0 para inactivo
                        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                    )`,
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        }
      });
    });
  }

  // Add new token
  addRefreshToken(username, refreshToken) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO tokens (username, refreshToken) VALUES (?, ?)`;
      this.db.run(query, [username, refreshToken], (err) => {
        if (err) reject(err.message);
        else resolve();
      });
    });
  }

  // Verify refresh token
  verifyRefreshToken(refreshToken) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM tokens WHERE refreshToken = ? AND status = 1`;
      this.db.get(query, [refreshToken], (err, row) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(!!row); // Devuelve true si hay resultado, false si no hay
        }
      });
    });
  }
  verifyRefreshTokenByName(username) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM tokens WHERE username = ? AND status = 1`;
      this.db.get(query, [username], (err, row) => {
        if (err) reject(err.message);
        else resolve(!!row);
      });
    });
  }
  // Verify token is inactive
  deactivateRefreshToken(refreshToken) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE tokens SET status = 0 WHERE refreshToken = ?`;
      this.db.run(query, [refreshToken], function (err) {
        if (err) reject(err.message);
        else resolve(this.changes > 0); // Retorna true si se actualizó alguna fila
      });
    });
  }

  deactivateRefreshTokenByName(name) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE tokens SET status = 0 WHERE username = ?`;
      this.db.run(query, [name], function (err) {
        if (err) reject(err.message);
        else resolve(this.changes > 0); // Retorna true si se actualizó alguna fila
      });
    });
  }

  // Close connection Database
  closeConnection() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db.close((err) => {
          if (err) {
            console.error("Error al cerrar la conexión:", err.message);
            reject(err);
          } else {
            console.log("Conexión a SQLite cerrada.");
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
}

module.exports = new TokenService();
