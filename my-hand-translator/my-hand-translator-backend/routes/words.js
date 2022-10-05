const express = require("express");

const router = express.Router();

const { checkTranslated } = require("../controllers/wordController");

router.get("/translated", checkTranslated);

module.exports = router;
