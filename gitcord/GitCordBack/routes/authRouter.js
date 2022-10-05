const express = require("express");
const router = express.Router();

const { checkUser } = require("../controllers/auth.controller");
const { authToken } = require("../middleWares/authToken");

router.post("/", authToken, checkUser);

module.exports = router;
