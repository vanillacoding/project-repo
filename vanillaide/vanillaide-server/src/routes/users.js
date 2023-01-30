const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");
const { getProjects, postProject } = require("../controllers/user.controller");

router
  .route("/:userId/projects")
  .all(authenticate)
  .get(getProjects)
  .post(postProject);

module.exports = router;
