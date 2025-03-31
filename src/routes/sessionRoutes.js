module.exports = function SessionRoutes() {
  const express = require("express");
  const userRoutes = require("@routes/userRoutes");
  const deskRoutes = require("@routes/deskRoutes");
  const routineRoutes = require("@routes/routineRoutes");
  const reportRoutes = require("@routes/reportRoutes");

  const router = express.Router();

  router.use("/user", userRoutes());
  router.use("/desk", deskRoutes());
  router.use("/routine",routineRoutes())
  router.use("/report",reportRoutes())

  return router;
};
