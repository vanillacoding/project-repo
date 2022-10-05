const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { getEvents, updateEvent } = require("../controllers/event.controller");

router.get("/", verifyToken, getEvents);
router.put("/", verifyToken, updateEvent);

module.exports = router;
