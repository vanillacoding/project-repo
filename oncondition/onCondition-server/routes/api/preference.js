const express = require("express");
const router = express.Router();
const preferenceController = require("../controller/preference");

router.delete("/:category", preferenceController.deleteCategory);

router.post("/", preferenceController.addCategory);

module.exports = router;
