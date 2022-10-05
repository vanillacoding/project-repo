const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const userController = require("../controllers/user.controller");

router.get("/", verifyToken, userController.getUserData);
router.patch("/", verifyToken, userController.updateFinalStageRecord);

module.exports = router;
