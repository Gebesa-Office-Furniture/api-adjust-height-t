module.exports = function AuthRoutes() {
  const express = require("express");
  const deskController = require("@controllers/deskController");

  const router = express.Router();
  router.post("/movement", deskController.movement);
  router.post("/conexion", deskController.connection);
  router.post('/:sUUID/height', deskController.moveToHeight);
  router.get("/:sName", deskController.changeDeskUUID);
  router.post("/changeUUID", deskController.changeDeskUUID);

  return router;
};
