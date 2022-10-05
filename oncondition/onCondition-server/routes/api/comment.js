const express = require("express");
const router = express.Router({ mergeParams: true });
const commentController = require("../controller/comment");

router.post("/", commentController.postComment);

router.patch("/:id", commentController.patchComment);

router.delete("/:id", commentController.deleteComment);

module.exports = router;
