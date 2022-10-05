const router = require("express").Router();

const roomControllers = require("../controllers/room.controller");

router.get("/:userId", roomControllers.getRoomByUserId);

module.exports = router;
