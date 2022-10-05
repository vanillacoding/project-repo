const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { updatePushNotificationToken } = require("../controllers/notification.controller");

router.put("/", verifyToken, updatePushNotificationToken);

module.exports = router;
