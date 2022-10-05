const express = require("express");
const router = express.Router();

const authorizeSlackApp = require("./controllers/slack.controller");

router.get("/authorize", authorizeSlackApp);

module.exports = router;
