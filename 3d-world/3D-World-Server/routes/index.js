const router = require("express").Router();

const room = require("./room");
const user = require("./user");
const mailbox = require("./mailbox");
const furniture = require("./furniture");

router.use("/room", room);
router.use("/user", user);
router.use("/mailbox", mailbox);
router.use("/furniture", furniture);

module.exports = router;
