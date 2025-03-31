

module.exports = function ReportRoutes() {
  const express = require("express");
  const ReportController = require("@controllers/reportController");
  const router = express.Router();
  router.post("/report", ReportController.get_report);

  return router;
};
