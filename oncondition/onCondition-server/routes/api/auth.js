const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

router.get("/", authController.getUserInfos);

router.post("/login", authController.postLogin);

router.post("/refresh", authController.postRefresh);

module.exports = router;
