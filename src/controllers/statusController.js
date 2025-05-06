const dotenv = require('dotenv');

// Asegurarse de que las variables de entorno estén cargadas
dotenv.config();

class StatusController {
  constructor() {}

  /**
   * Verifica el valor de CHECK_STATUS en el archivo .env
   * Retorna código 200 si es true, o 201 si es false
   * @type {MiddlewareFunction}
   */
  async checkStatus(req, res, next) {
    try {
      // Obtener el valor de CHECK_STATUS del archivo .env
      const checkStatus = process.env.CHECK_STATUS === 'true';
      
      if (checkStatus) {
        return res.status(200).json({ 
          status: true,
          message: 'Status check passed with true value' 
        });
      } else {
        return res.status(201).json({ 
          status: false,
          message: 'Status check passed with false value' 
        });
      }
    } catch (error) {
      console.error('Error checking status:', error);
      next(error);
    }
  }
}

module.exports = new StatusController();
