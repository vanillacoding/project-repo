var express = require("express");
var router = express.Router();

const auth = require("./auth");
const user = require("./user");
const event = require("./event");
const score = require("./score");

router.use("/auth", auth);
router.use("/user", user);
router.use("/event", event);
router.use("/score", score);

module.exports = router;
