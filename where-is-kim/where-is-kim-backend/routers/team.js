import express from 'express';
import { upload } from '../middlewares';
import {
  postNewTeam,
  postJoinTeam,
  deleteTeam,
  postInviteMember,
  postVerifyMember,
  postOnWork,
  postOffWork,
  postVerifyAdmin,
  putAdmins
} from '../controllers/team';

const router = express.Router();

router.post('/new', upload.single('file'), postNewTeam);
router.post('/:name/join', postJoinTeam);
router.delete('/:id', deleteTeam);
router.post('/:teamId/invite', postInviteMember);
router.post('/verify', postVerifyMember);
router.post('/:teamId/onWork', postOnWork);
router.post('/:teamId/offWork', postOffWork);
router.post('/:teamId/verifyAdmin', postVerifyAdmin);
router.put('/:teamId/admins', putAdmins);

export default router;
