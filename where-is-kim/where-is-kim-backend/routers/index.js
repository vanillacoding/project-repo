import express from 'express';
import { authenticateWithJWT } from '../middlewares';
import auth from './auth';
import team from './team';
import thread from './thread';

const router = express.Router();

router.use('/auth', auth);
router.use('/team', authenticateWithJWT, team);
router.use('/thread', authenticateWithJWT, thread);

export default router;
