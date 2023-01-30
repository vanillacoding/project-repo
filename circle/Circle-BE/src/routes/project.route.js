const express = require("express");

const router = express.Router();

const projectController = require("./controllers/project.controller");
const channelController = require("./controllers/channel.controller");

router
  .route("/")
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router
  .route("/:projectId")
  .get(projectController.getProject)
  .put(projectController.editProject)
  .delete(projectController.deleteProject);

router
  .route("/:projectId/channels")
  .post(channelController.createChannel);

router
  .route("/:projectId/channels/:channelId")
  .put(channelController.editChannel)
  .delete(channelController.deleteChannel);

module.exports = router;
