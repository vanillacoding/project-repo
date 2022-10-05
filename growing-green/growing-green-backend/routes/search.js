const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');
const verifyToken = require('../middlewares/authorization');

router.get('/', verifyToken, searchController.crawlPlantNames);
router.get('/:number', verifyToken, searchController.crawlPlantInfo);

module.exports = router;
