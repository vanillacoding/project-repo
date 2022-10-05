const express = require("express");
const router = express.Router();
const auth = require("../../../middlewares/auth");
const { postComment, deleteComment, likeCount } = require("./comments.controller");

router.post("/", auth, postComment);
router.delete("/:comment_id", auth, deleteComment);
router.put("/:comment_id/like", auth, likeCount);

module.exports = router;
