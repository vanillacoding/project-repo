const express = require('express');
const router = express.Router();
const auth = require('../../../middlewares/auth');
const { getCountryData, likeCount } = require('./countries.controller');

router.get('/:country_id', getCountryData);
router.put('/:country_id/like', auth, likeCount);

module.exports = router;
