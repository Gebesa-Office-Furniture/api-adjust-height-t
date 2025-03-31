const express = require("express");
const jwtService = require("@services/jwtService");

/**
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  const bearer = req.header('Authorization')?.split(' ')[0];

  if(bearer!='Bearer'){
    res.status(401).json({ message: 'Token is not valid' });
  }

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwtService.verifyToken(token);
    if(decoded == null){
      res.status(401).json({ message: 'Token is not valid' });
    }
    req.user = decoded; // Puedes agregar información del usuario al objeto `req`
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

