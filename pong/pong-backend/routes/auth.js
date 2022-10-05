const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/login", authController.login);
router.post("/logout", verifyToken, authController.logout);

module.exports = router;
