module.exports = function StatusRoutes() {
  const express = require("express");
  const StatusController = require("@controllers/statusController");

  const router = express.Router();

  router.get("/check", StatusController.checkStatus);

  return router;
};
