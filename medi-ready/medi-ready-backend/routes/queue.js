const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { getQueue, registerQueue } = require("../controllers/queue.controller");

router.get("/", verifyToken, getQueue);

router.post("/", verifyToken, registerQueue);

module.exports = router;
