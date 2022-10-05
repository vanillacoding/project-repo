const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { getScore } = require("../controllers/couple.controller");

router.get("/", verifyToken, getScore);

module.exports = router;
