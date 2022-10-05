const express = require("express");
const {
  editGlossary,
  getGlossariesByKeyword,
} = require("../controllers/glossaryController");

const validateGlossary = require("../middlewares/validate/validateGlossary");
const validateGlossaryId = require("../middlewares/validate/validateGlossaryId");
const validatePagination = require("../middlewares/validate/validatePagination");

const router = express.Router();

router.patch(
  "/:glossary_id",
  validateGlossary,
  validateGlossaryId,
  editGlossary,
);

router.get("/", validatePagination, getGlossariesByKeyword);

module.exports = router;
