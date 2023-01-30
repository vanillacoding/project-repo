const express = require("express");
const router = express.Router();

const {
  postAuthCheck,
  postSignUp,
  postLogIn,
} = require("../controllers/auth.controller");

router.post("/", postAuthCheck);

router.post("/signup", postSignUp);

router.post("/login", postLogIn);

module.exports = router;
