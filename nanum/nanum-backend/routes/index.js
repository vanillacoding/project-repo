const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    code: 200,
    message: 'success',
  });
});

module.exports = router;
