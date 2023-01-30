const express = require('express');

const router = express.Router();

const auth = require('./middlewares/authMiddleware');
const authWithoutError = require('./middlewares/authWithoutErrorMiddleware');
const {
  getMindMapData,
  putMindMapData,
  postMindMapData,
  deleteMindMapData,
  getMindMapAccessData,
} = require('./middlewares/mindMapDataHandlingMiddleware');
const {
  postHeadNodeData,
} = require('./middlewares/nodeDataHandlingMiddleware');
const {
  endOfMindMapReq,
  endOfPostMindMapReq,
  endOfDeleteMindMapReq,
  endOfMindMapAccessReq,
} = require('./controllers/mindMapController');

router
  .route('/:mindMapId')
  .get(auth, getMindMapData, endOfMindMapReq)
  .put(auth, putMindMapData, endOfMindMapReq)
  .delete(auth, deleteMindMapData, endOfDeleteMindMapReq);

router
  .route('/')
  .post(auth, postMindMapData, postHeadNodeData, endOfPostMindMapReq);

router
  .route('/:mindMapId/access')
  .get(authWithoutError, getMindMapAccessData, endOfMindMapAccessReq);

module.exports = router;
