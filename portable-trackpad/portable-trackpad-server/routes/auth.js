const express = require("express");
const router = express.Router();
const { googleAuth } = require("./controllers/auth.controller");

router.post("/login", googleAuth);

module.exports = router;
