const express = require('express');

const router = express.Router();

const {
  endOfMindMapListReq,
  endOfAllMindMapIdListReq,
} = require('./controllers/mindMapController');
const {
  getPublicMindMapList,
  getAllMindMapIdList,
} = require('./middlewares/mindMapDataHandlingMiddleware');

router.get('/mind-maps', getPublicMindMapList, endOfMindMapListReq);
router.get('/all-mind-maps-id', getAllMindMapIdList, endOfAllMindMapIdListReq);

module.exports = router;
