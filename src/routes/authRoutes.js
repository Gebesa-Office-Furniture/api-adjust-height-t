module.exports = function AuthRoutes() {
  const express = require("express");
  const AuthController = require("@controllers/authController");

  const router = express.Router();

  router.post("/login", AuthController.login);
  // router.post("/logout", AuthController.logout); //Fase beta
  router.post("/refreshToken", AuthController.refreshToken);
  router.post("/register", AuthController.register);
  //====================

  return router;
};
