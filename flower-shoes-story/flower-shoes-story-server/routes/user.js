const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { updateUserInfo, deleteUser } = require("../controllers/user.controller");

router.put("/update", verifyToken, updateUserInfo);
router.delete("/delete", verifyToken, deleteUser);

module.exports = router;
