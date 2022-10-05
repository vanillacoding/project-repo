const express = require("express");
const router = express.Router();

const {
  joinUser,
  loginUser,
  googleLogin
} = require("../controllers/user.controller");

router.post("/", joinUser);
router.put("/", loginUser);

router.post("/google", googleLogin);

module.exports = router;
