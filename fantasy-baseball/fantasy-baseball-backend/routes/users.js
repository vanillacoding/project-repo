const express = require("express");
const usersController = require("../controllers/users.controller");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

router.get("/login", authenticateUser, usersController.login);
router.get("/logout", usersController.logout);
router.get("/checkUser", authenticateUser, usersController.checkUser);

module.exports = router;
