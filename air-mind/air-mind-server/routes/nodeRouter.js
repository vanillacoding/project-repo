const express = require('express');

const router = express.Router();
const setUpobjectStorage = require('../utils/uploadImages');

const auth = require('./middlewares/authMiddleware');
const {
  getNodeData,
  putNodeData,
  makePlainObject,
  postNodeData,
  deleteNodeData,
  isPublicNode,
  postImageDataInNode,
  deleteImageDataInNode,
} = require('./middlewares/nodeDataHandlingMiddleware');
const {
  endOfGetNodeReq,
  endOfPutNodeReq,
  endOfPostNodeReq,
  endOfDeleteNodeReq,
} = require('./controllers/nodeController');
const {
  getAllComments,
  createComment,
} = require('./controllers/commentController');

router
  .route('/:nodeId/images')
  .post(
    setUpobjectStorage('air-mind-images'),
    postImageDataInNode,
    endOfPutNodeReq,
  )
  .put(deleteImageDataInNode, endOfPutNodeReq);

router
  .route('/:nodeId')
  .get(getNodeData, makePlainObject, isPublicNode, auth, endOfGetNodeReq)
  .put(auth, putNodeData, endOfPutNodeReq)
  .post(auth, postNodeData, endOfPostNodeReq)
  .delete(auth, deleteNodeData, endOfDeleteNodeReq);

router.route('/:nodeId/comments').put(getAllComments).post(createComment);

module.exports = router;
