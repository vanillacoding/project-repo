const express = require("express");
const {
  getRecentPc,
  getGesture,
  getCustomGesture,
  updateRecentPc,
  updateGestures,
  updateCustomGesture,
  postEmail,
} = require("./controllers/user.controller");
const router = express.Router();
const { verifyToken } = require("./middlewares/authorization");

router
  .route("/:users_id/gestures")
  .get(verifyToken, getGesture)
  .post(verifyToken, updateGestures);

router
  .route("/:users_id/customGesture")
  .get(verifyToken, getCustomGesture)
  .post(verifyToken, updateCustomGesture);

router
  .route("/:users_id/pc")
  .get(verifyToken, getRecentPc)
  .post(verifyToken, updateRecentPc);

router.post("/email", verifyToken, postEmail);

module.exports = router;
