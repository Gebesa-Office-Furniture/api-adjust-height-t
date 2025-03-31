module.exports = function RoutineRoutes() {
  const express = require("express");
  const RoutineController = require("@controllers/routineController");
  const router = express.Router();

  router.post("/routine", RoutineController.create_routine);
  router.get("/routine", RoutineController.get_routine);
  router.post("/prepared/start", RoutineController.start_routine);
  router.post("/prepared/stop", RoutineController.stop_routine);


  return router;
};
