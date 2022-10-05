const express = require("express");
const router = express.Router();

const { validatePostInfo } = require("../../middlewares/postValidation");

const {
  patchPost,
  deletePost,
  patchPostLike,
  postWorryPost,
  getDetailPost,
  getCategoryPost,
  getpostComments,
  patchPostComments,
  patchPostCommentLike
} = require("../../controllers/postController");

router.post("/", validatePostInfo, postWorryPost);
router.patch("/", validatePostInfo, patchPost);
router.patch("/like", patchPostLike);
router.patch("/comments", patchPostComments);
router.patch("/comments/like", patchPostCommentLike);
router.get("/category/:category", getCategoryPost);
router.get("/comments/:id", getpostComments);
router.get("/:postId", getDetailPost);
router.delete("/:postId", deletePost);

module.exports = router;
