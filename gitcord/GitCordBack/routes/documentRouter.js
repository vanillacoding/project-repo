const express = require('express');
const router = express.Router();

const {
  saveDocument,
  getDocuments,
  deleteDocument
} = require("../controllers/document.controller");

router.post("/", saveDocument);
router.get("/:userId", getDocuments);
router.delete("/:documentId", deleteDocument);

module.exports = router;
