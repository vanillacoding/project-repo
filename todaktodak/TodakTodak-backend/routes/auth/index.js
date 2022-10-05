const express = require("express");
const router = express.Router();

const { validateSignupInfo } = require("../../middlewares/signupValidate");
const { validateLoginInfo } = require("../../middlewares/loginValidate");
const { authorizeUser } = require("../../middlewares/authorizeUser");

const {
  putLogin,
  postSignup,
  addFriend,
  getMyPosts,
  getFriends,
  getWaitingFrineds,
  patchAcceptFriend,
  patchRejectFriend
} = require("../../controllers/authController");

router.get("/posts", authorizeUser, getMyPosts);
router.get("/friend", authorizeUser, getFriends);
router.get("/waitingFriend", authorizeUser, getWaitingFrineds);
router.post("/", validateSignupInfo, postSignup);
router.put("/", validateLoginInfo, putLogin);
router.patch("/friend", authorizeUser, addFriend);
router.patch("/waitingFriend", authorizeUser, patchAcceptFriend);
router.patch("/rejectFriend", authorizeUser, patchRejectFriend);

module.exports = router;
