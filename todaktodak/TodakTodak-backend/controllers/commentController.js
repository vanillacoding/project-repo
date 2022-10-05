const createError = require("http-errors");

const Post = require("../models/Post");
const Comment = require("../models/Comment");

const { SERVER_MESSAGE } = require("../constants/errorComment");

module.exports.getComments = async (req, res, next) => {
  try {
    const { email } = req.userInfo;

    const fileredComment = await Comment.aggregate(
      [
        {
          $match: { "user": email }
        },
        {
          $sort: { "_id": -1 }
        }
      ]
    );

    res.json({
      errorMessage: null,
      comments: fileredComment
    });
  } catch (err) {
    console.error(err.message);

    return next(createError(500, SERVER_MESSAGE));
  }
};

module.exports.patchCommentLike = async (req, res, next) => {
  try {
    const {
      body: {
        commentId
      },
      userInfo: {
        email
      }
    } = req;

    const targetComment = await Comment.findById(commentId);
    let commentLikeList = targetComment.likes;
    const isLikedUser = commentLikeList.includes(email);

    if (isLikedUser) {
      const removeIndex = commentLikeList.indexOf(email);

      commentLikeList.splice(removeIndex, 1);
    } else {
      commentLikeList.push(email);
    }

    await targetComment.updateOne({
      "$set": { "likes": commentLikeList }
    });

    res.json({ errorMessage: null });
  } catch (err) {
    console.error(err.message);

    return next(createError(500, SERVER_MESSAGE));
  }
};

module.exports.patchComment = async (req, res, next) => {
  try {
    const {
      body: {
        comment,
        commentId
      },
      userInfo: {
        email
      }
    } = req;

    const targetComment = await Comment.findById(commentId);

    await targetComment.updateOne({
      "$set": { content: comment }
    });

    const fileredComment = await Comment.aggregate(
      [
        {
          $match: { "user": email }
        },
        {
          $sort: { "_id": -1 }
        }
      ]
    );

    res.json({
      errorMessage: null,
      comments: fileredComment
    });
  } catch (err) {
    console.error(err.message);

    return next(createError(500, SERVER_MESSAGE));
  }
};

module.exports.deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const targetComment = await Comment.findById(commentId).lean();
    const CommentPost = await Post.findById(targetComment.post);
    const deletedPostComments = CommentPost.comments.filter((comment) =>
      String(comment) !== String(commentId)
    );

    await CommentPost.update({ "$set": { "comments": deletedPostComments } });
    await Comment.findByIdAndDelete(commentId);

    const myComments = await Comment.aggregate(
      [
        {
          $match: { "user": targetComment.user }
        },
        {
          $sort: { "_id": -1 }
        }
      ]
    );

    res.json({
      errorMessage: null,
      comments: myComments
    });
  } catch (err) {
    console.error(err.message);

    return next(createError(500, SERVER_MESSAGE));
  }
};
