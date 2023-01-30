const express = require("express");
const { getLocalIps } = require("./controllers/localIp.controller");
const router = express.Router();

router.get("/", getLocalIps);

module.exports = router;
