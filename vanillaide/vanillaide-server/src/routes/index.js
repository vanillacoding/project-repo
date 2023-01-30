const express = require("express");
const router = express.Router();

const auth = require("./auth");
const users = require("./users");
const projects = require("./projects");

router.use("/auth", auth);
router.use("/users", users);
router.use("/projects", projects);

module.exports = router;
