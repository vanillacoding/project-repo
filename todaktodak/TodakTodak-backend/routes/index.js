const express = require("express");
const router = express.Router();

const authRouter = require("../routes/auth/index");
const postRouter = require("../routes/post/index");
const commentRouter = require("../routes/comment/index");

const { authorizeUser } = require("../middlewares/authorizeUser");

router.use("/auth", authRouter);
router.use("/post", authorizeUser, postRouter);
router.use("/comment", authorizeUser, commentRouter);

module.exports = router;
