import express from 'express';
import {
  postLike,
  postComment
} from '../controllers/threads';

const router = express.Router();

router.post('/:id/like', postLike);
router.post('/:id/comment', postComment);

export default router;
