const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ "result": "ok" });
});

module.exports = router;
