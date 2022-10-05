const express = require("express");
const router = express.Router();

const { login, logout, authorize } = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/login", login);
router.post("/logout", logout);
router.get("/check", verifyToken, authorize);

module.exports = router;
