const express = require("express");

const router = express.Router();

const projectController = require("./controllers/project.controller");

router
  .route("/:projectId/service/auth")
  .post(projectController.showServiceProject);

module.exports = router;
