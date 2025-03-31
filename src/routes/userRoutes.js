module.exports = function UserRoutes() {
  const express = require("express");
  const userController = require("@controllers/userController");

  const router = express.Router();

  // router.post("/logout", userController.logout); //Fase beta
  router.delete("/delete", userController.delete);
  router.post("/updateinfo", userController.updateInfo);
  router.post("/updateadditionalinfo", userController.updateAdditionalInfo);
  router.get("/settings", userController.settings);
  router.post("/memory", userController.memory);
  router.post("/suscribe", userController.suscribe);
  router.post("/setgoal", userController.setgoal);
  router.get("/getgoal", userController.getgoal);
  router.post("/test", userController.test);

  return router;
};
