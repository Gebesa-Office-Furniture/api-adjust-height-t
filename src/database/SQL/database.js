
  const sql = require("mssql");
  const dbConfig = require("@config/databaseConfig")
  
  class Database {
    constructor() {
      if (Database.instance) {
        // Retorna la misma instancia si ya existe
        return Database.instance;
      }
      const requiredEnvVars = [
        'DB_USER',
        'DB_PASSWORD',
        'DB_SERVER',
        'DB_DATABASE',
        'DB_PORT'
      ];
    
      requiredEnvVars.forEach((envVar) => {
        if (!dbConfig[envVar]) {
          throw new Error(`Missing environment variable: ${envVar}`);
        }
      });
    
      this.config = {
          user: dbConfig.DB_USER,
          password: dbConfig.DB_PASSWORD,
          server: dbConfig.DB_SERVER,
          database: dbConfig.DB_DATABASE,
          port: parseInt(dbConfig.DB_PORT,10),
          options: {
            encrypt: true,
            trustServerCertificate: true,
            // Habilitar Always Encrypted
            columnEncryptionSetting: true 
          },
          pool: {
          min: 1,   // Número mínimo de conexiones en el pool
          max: 20,  // Número máximo de conexiones en el pool
          idleTimeoutMillis: 3000  // Tiempo en ms antes de cerrar una conexión inactiva
        }
      };
      this.pool = null; // Variable para almacenar la conexión
      Database.instance = this; // Guarda la instancia en el Singleton
    }

  /**
   *@private 
   */
  async getPool() {
    if (!this.pool) {
      try {
        this.pool = await sql.connect(this.config);
      } catch (error) {
        throw error;
      }
    }
    return this.pool;
  }
    /**
   * Executes the provided callback with a connection pool to the database.
   * Ensures that the connection is closed after the operation, even if an error occurs.
   * 
   * @param {function(sql.ConnectionPool)} callback - The function to execute with the connection pool
   * @returns {Promise<IResult<any>>} - The result of the callback function execution
   */
    async using(callback) {
    const pool = await this.getPool();
    try {
        return await callback(pool);
      } catch (error) {
        throw error;
      }
        // finally{
        //   await pool.close();
        // }
    }
    async close() {
     if (this.pool) {
        await this.pool.close();
      }
    }
  }
  module.exports = new Database();
