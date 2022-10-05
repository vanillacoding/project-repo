const express = require('express');
const router = express.Router();
const { getHashtagList } = require('./hashtags.controller');

router.get('/:hashtag_id', getHashtagList);

module.exports = router;
