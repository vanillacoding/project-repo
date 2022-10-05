const express = require("express");
const router = express.Router();
const usersController = require("../controller/users.controller");

router.get("/", usersController.getAll);

module.exports = router;
