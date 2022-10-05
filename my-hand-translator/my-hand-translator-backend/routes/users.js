const express = require("express");

const validateEmail = require("../middlewares/validate/validateEmail");
const validateGlossary = require("../middlewares/validate/validateGlossary");
const validateKeywords = require("../middlewares/validate/validateKeywords");
const validateUsername = require("../middlewares/validate/validateUsername");
const validateUserIdParams = require("../middlewares/validate/validateUserIdParams");

const {
  signup,
  login,
  findGlossary,
} = require("../controllers/userController");

const router = express.Router();

router.post(
  "/signup",
  validateEmail,
  validateGlossary,
  validateKeywords,
  validateUsername,
  signup,
);

router.post("/login", validateEmail, login);

router.get("/:user_id/glossary", validateUserIdParams, findGlossary);

module.exports = router;
