module.exports = function AuthRoutes() {
  const express = require("express");
  const deskController = require("@controllers/deskController");

  const router = express.Router();
  router.post("/movement", deskController.movement);
  router.post("/conexion", deskController.connection);

  return router;
};
