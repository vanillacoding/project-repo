const Country = require('../../../models/Country');
const Comment = require('../../../models/Comment');
const { NotFoundError } = require('../../../lib/errors');

/* 
  GET /api/users/:user_id/comments
*/

exports.getUserComments = async (req, res, next) => {
  try {
    const { user_id: userId } = req.params;
    const comments = await Comment.find()
      .populate('hashtags')
      .populate('author');
    const commentList = comments.filter((comment) => {
      return String(comment.author._id) === userId;
    });

    res.status(200).json({
      commentList
    });
  } catch (err) {
    next(new NotFoundError());
  }
};

/* 
  GET /api/users/:user_id/likes
*/

exports.getUserLikes = async (req, res, next) => {
  try {
    const { user_id: userId } = req.params;
    const countries = await Country.find();
    const likeList = countries.filter((country) => {
      return country.likes.includes(userId);
    });

    res.status(200).json({
      likeList
    });
  } catch (err) {
    next(new NotFoundError());
  }
};
