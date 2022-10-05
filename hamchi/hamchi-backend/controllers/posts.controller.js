const createError = require('http-errors');
const { postErrorMessage } = require('../constants/errorMessage');

const s3 = require('../loaders/s3');
const User = require('../models/User');
const Post = require('../models/Post');

exports.getPosts = async function (req, res, next) {
  try {
    const { page = 1, limit = 6 } = req.body;
    let { type } = req.query;
    let posts;

    if (!type) {
      posts = await Post.find({ status: 'opened' })
        .sort([['_id', -1]])
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    } else {
      const types = Array.isArray(type) ? type : [type];

      posts = await Post.aggregate([
        { $match: { type: { $in: types } } },
        { $match: { status: 'opened' } },
        { $sort: { _id: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit * 1 }
      ]);
    }

    res.json({
      data: {
        posts,
        page
      }
    });
  } catch (err) {
    next(createError(500, postErrorMessage.POST_FETCH_FAILED));
  }
};

exports.myPosts = async function (req, res, next) {
  try {
    const { userId } = req.params;

    const user = await User
      .findById(userId)
      .sort([['_id', -1]])
      .populate({
        path: 'posts',
        model: 'Post',
        populate: {
          path: 'submissions',
          model: 'Submission'
        }
      });

    res.json({
      code: 200,
      message: 'my posts fetch success',
      data: { posts: user.posts },
    });
  } catch (err) {
    next(createError(500, postErrorMessage.POST_FETCH_FAILED));
  }
};

exports.createPost = async function (req, res, next) {
  try {
    const {
      userId,
      username,
      photo,
      name,
      age,
      gender,
      location,
      type,
      number,
      details
    } = req.body;

    const buffer = Buffer.from(photo.base64, "base64");
    const params = {
      Bucket: 'hamchi-images',
      Key: Date.now() + new Date().toISOString(),
      Body: buffer,
      ACL: 'public-read',
      ContentEncoding: "base64",
      ContentType: "image/jpg",
    };
    const imageUrl = await s3.upload(params).promise();
    const createdAt = Date.now();

    const createdPost = await Post.create({
      owner: userId,
      ownerName: username,
      image: imageUrl.Location,
      name,
      age,
      gender,
      location,
      type,
      number,
      details,
      createdAt,
      status: 'opened'
    });

    await User.updateOne(
      { _id: userId },
      { $push: { posts: createdPost._id } }
    );

    res.json({
      code: 200,
      message: 'create post success',
      data: {
        post: createdPost
      },
    });
  } catch (err) {
    next(createError(500, postErrorMessage.POST_CREATE_FAILED));
  }
}

exports.closePost = async function (req, res, next) {
  try {
    const { postId } = req.params;

    await Post.findByIdAndUpdate(
      postId,
      { $set: { status: 'closed' } }
    );

    res.json({
      code: 200,
      message: 'close post success',
    });
  } catch (err) {
    next(createError(500, postErrorMessage.POST_CREATE_FAILED));
  }
};
