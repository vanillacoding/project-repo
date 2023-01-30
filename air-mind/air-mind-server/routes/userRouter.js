const express = require('express');

const router = express.Router();

const auth = require('./middlewares/authMiddleware');
const {
  getMyMindMapList,
} = require('./middlewares/mindMapDataHandlingMiddleware');
const { endOfMindMapListReq } = require('./controllers/mindMapController');
const { login } = require('./controllers/authController');

router.get('/:userId/mind-maps', auth, getMyMindMapList, endOfMindMapListReq);
router.post('/login', auth, login);

module.exports = router;
