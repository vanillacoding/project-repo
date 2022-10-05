const express = require("express");
const router = express.Router();
const {
  checkAuthDB,
  loginDB,
  socialLoginDB,
  signupDB,
} = require("./controllers/authController");

router.route("/check_auth").post(checkAuthDB);
router.route("/login").post(loginDB);
router.route("/social_login").post(socialLoginDB);
router.route("/signup").post(signupDB);

module.exports = router;
