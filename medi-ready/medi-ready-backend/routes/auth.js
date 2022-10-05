const express = require("express");
const router = express.Router();

const validateUserInfo = require("../middlewares/validateUserInfo");

const { verifyToken } = require("../middlewares/verifyToken");
const { login, logout, authorize } = require("../controllers/auth.controller");

router.post("/login", validateUserInfo, login);

router.post("/logout", logout);

router.get("/check", verifyToken, authorize);

module.exports = router;
