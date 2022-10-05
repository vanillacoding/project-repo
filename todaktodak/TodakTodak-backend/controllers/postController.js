const createError = require("http-errors");

const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const {
  SERVER_ERROR,
  MISSING_CONTENT,
  GET_POSTS_MESSAGE
} = require("../constants/errorComment");

module.exports.postWorryPost = async (req, res, next) => {
  try {
    const {
      body: {
        postType,
        category,
        postTitle,
        worryContents,
        anonymousType
      },
      userInfo: {
        id
      }
    } = req;

    const isPublic = postType === "Public" ? true : false;
    const isAnonymous = anonymousType === "anonymouns" ? true : false;

    if (
      !postType ||
      !anonymousType ||
      !category ||
      !worryContents
    ) {
      return next(createError(400, MISSING_CONTENT));
    }

    const currentUser = await User.findById(id);
    const newPost = await Post.create({
      title: postTitle,
      owner: currentUser.email,
      ownerNickname: currentUser.nickname,
      isPublic,
      isAnonymous,
      contents: worryContents,
      category
    });

    currentUser.posts.push(newPost._id);
    await currentUser.save();

    res.json({ errorMessage: null });
  } catch (err) {
    console.error(err.message);

    return next(createError(500, SERVER_ERROR));
  }
};

module.exports.getCategoryPost = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { page } = req.headers;
    const limit = 5;

    const filteredAllPost = await Post
      .aggregate(
        [
          {
            $match: { "category": category }
          },
          {
            $match: { "isPublic": true }
          }
        ]
      );

    const sortPostLikes = (prev, next) => {
      if (prev.likes.length > next.likes.length) {
        return -1;
      }

      return 1;
    };

    const bestPost = filteredAllPost.sort(sortPostLikes)[0];

    const filteredPost = await Post
      .aggregate(
        [
          {
            $match: { "category": category }
          },
          {
            $match: { "isPublic": true }
          },
          {
            $sort: { "_id": -1 }
          },
          {
            $skip: limit * page
          },
          {
            $limit: limit
          }
        ]
      );

    res.json({
      errorMessage: null,
      highestLikesPost: bestPost,
      categoryPosts: filteredPost
    });
  } catch (err) {
    console.error(err.message);

    return next(createError(500, GET_POSTS_MESSAGE));
  }
};

module.exports.patchPostLike = async (req, res, next) => {
  try {
    const {
      body: {
        postId
      },
      userInfo: {
        email
      }
    } = req;

    const targetPost = await Post.findById(postId);
    let targetPostLikes = targetPost.likes;
    const isLikedUser = targetPostLikes.includes(email);

    if (isLikedUser) {
      const removeIndex = targetPostLikes.indexOf(email);

      targetPostLikes.splice(removeIndex, 1);
    } else {
      targetPostLikes.push(email);
    }

    await targetPost.updateOne({
      "$set": { "likes": targetPostLikes }
    });

    res.json({ errorMessage: null });
  } catch (err) {
    next(createError(500, { errorMessage: err.message }));
  }
};

module.exports.patchPostCommentLike = async (req, res, next) => {
  try {
    const {
      body: {
        postId,
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

    const populatedPost = await Post
      .findById(postId)
      .populate("comments");

    res.json({
      errorMessage: null,
      populatedPost
    });
  } catch (err) {
    console.error(err.message);

    next(createError(500, SERVER_ERROR));
  }
};

module.exports.patchPostComments = async (req, res, next) => {
  try {
    const {
      body: {
        postId,
        content
      },
      userInfo: {
        email,
        nickname
      }
    } = req;

    const currentPost = await Post.findById(postId);
    const newComment = await Comment.create({
      content,
      nickname,
      user: email,
      post: postId
    });

    currentPost.comments.push(newComment._id);
    await currentPost.save();

    const populatedPost = await Post
      .findById(postId)
      .populate("comments");

    res.json({
      errorMessage: null,
      postComments: populatedPost.comments
    });
  } catch (err) {
    console.error(err.message);

    next(createError(500, SERVER_ERROR));
  }
};

module.exports.getDetailPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    res.json({
      errorMessage: null,
      post
    });
  } catch (err) {
    console.error(err.message);

    next(createError(500, SERVER_ERROR));
  }
};

module.exports.patchPost = async (req, res, next) => {
  try {
    const {
      postId,
      postType,
      category,
      postTitle,
      worryContents,
      anonymousType
    } = req.body;

    const isPublic = postType === "Public" ? true : false;
    const isAnonymous = anonymousType === "anonymouns" ? true : false;

    await Post.findById(postId).updateMany({
      isPublic,
      category,
      isAnonymous,
      title: postTitle,
      contents: worryContents
    });

    res.json({ errorMessage: null });
  } catch (err) {
    console.error(err.message);

    next(createError(500, SERVER_ERROR));
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const {
      _id,
      owner,
      comments
    } = await Post.findById(postId).lean();
    const postOwner = await User.findOne({ email: owner });
    const ownerPosts = postOwner.posts;

    const deletedPosts = ownerPosts.filter((post) =>
      String(post) !== String(_id)
    );

    await postOwner.update({ "$set": { "posts": deletedPosts } });
    await Post.findByIdAndDelete(postId);
    await Comment.deleteMany({ _id: { $in: comments } });

    const deletedPostUserInfo = await User
      .findOne({ email: owner })
      .populate("posts")
      .lean();

    res.json({
      errorMessage: null,
      posts: deletedPostUserInfo.posts
    });
  } catch (err) {
    console.error(err.message);

    next(createError(500, SERVER_ERROR));
  }
};

module.exports.getpostComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postInfo = await Post.findById(id).populate("comments").lean();

    res.json({
      errorMessage: null,
      comments: postInfo.comments
    });
  } catch (err) {
    console.error(err.message);

    next(createError(500, SERVER_ERROR));
  }
};
