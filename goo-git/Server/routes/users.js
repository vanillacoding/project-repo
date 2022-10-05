const express = require('express');
const router = express.Router();

const {
  getCurrentUser,
  getAuthor,
  getSharedUserInfos,
} = require('./controllers/user.controller');
const {
  createBranch,
  getBranches,
  getBranch,
  getPrivateBranches,
  deleteBranch,
} = require('./controllers/branch.controller');
const { createNote, getNote } = require('./controllers/note.controller');
const {
  getBranchSharingInfo,
  createBranchSharingInfo,
  updateSharedUserPermission,
  deleteSharedUserPermission,
} = require('./controllers/branchSharingInfo.controller');
const verifyToken = require('./middlewares/verifyToken');
const verifyClaimedUserId = require('./middlewares/verifyClaimedUserId');

router.get('/current_user', getCurrentUser);

router.get(
  '/:user_id/branch_sharing_infos/:branch_sharing_info_id',
  verifyToken,
  verifyClaimedUserId,
  getBranchSharingInfo
);

router.get(
  '/:user_id/branches',
  verifyToken,
  verifyClaimedUserId,
  getBranches
);

router.get(
  '/:user_id/branches/private',
  verifyToken,
  verifyClaimedUserId,
  getPrivateBranches
);

router.get(
  '/:user_id/branches/:branch_id',
  verifyToken,
  verifyClaimedUserId,
  getBranch
);

router.get(
  '/:user_id/users/:author_id',
  verifyToken,
  verifyClaimedUserId,
  getAuthor
);

router.post(
  '/:user_id/branches/new',
  verifyToken,
  verifyClaimedUserId,
  createBranch
);

router.post(
  '/:user_id/branches/:branch_id/notes/new',
  verifyToken,
  verifyClaimedUserId,
  createNote
);

router.get(
  '/:user_id/notes/:note_id',
  verifyToken,
  verifyClaimedUserId,
  getNote
);

router.get(
  '/:user_id/branches/:branch_id/share/users',
  verifyToken,
  verifyClaimedUserId,
  getSharedUserInfos
);

router.post(
  '/:user_id/branches/:branch_id/share/new',
  verifyToken,
  verifyClaimedUserId,
  createBranchSharingInfo
);

router.put(
  '/:user_id/branches/:branch_id/permission',
  verifyToken,
  verifyClaimedUserId,
  updateSharedUserPermission
);

router.delete(
  '/:user_id/branches/:branch_id/permission',
  verifyToken,
  verifyClaimedUserId,
  deleteSharedUserPermission
);

router.delete(
  '/:user_id/branches/:branch_id',
  verifyToken,
  verifyClaimedUserId,
  deleteBranch
);

module.exports = router;
