const express = require("express");
const userController = require("./controllers/user.controller");
const verifyToken = require("./middlewares/authorization");

const router = express.Router();

router.post("/login/local", userController.localLogin);
router.post("/login/social", userController.socialLogin);
router.post("/login/refresh/:user_id", verifyToken, userController.refreshLogin);
router.post("/signup", userController.signup);
router.post("/logout/:user_id", verifyToken, userController.logout);

module.exports = router;
