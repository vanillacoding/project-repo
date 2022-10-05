const express = require("express");

const router = express.Router();

const validateEmail = require("../middlewares/validate/validateEmail");
const validateGlossary = require("../middlewares/validate/validateGlossary");
const validateUserIdParams = require("../middlewares/validate/validateUserIdParams");
const validatePagination = require("../middlewares/validate/validatePagination");
const {
  validateTranslation,
  validateTranslations,
  validateTranslationId,
} = require("../middlewares/validate/validateTranslations");

const {
  byUserId,
  createByUserId,
  synchronize,
  remove,
} = require("../controllers/translationController");

router.get("/:user_id", validateUserIdParams, validatePagination, byUserId);

router.post("/", validateEmail, validateTranslations, synchronize);

router.post(
  "/:user_id",
  validateUserIdParams,
  validateGlossary,
  validateTranslation,
  createByUserId,
);

router.delete("/:translation_id", validateTranslationId, remove);

module.exports = router;
