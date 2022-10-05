const Country = require('../../../models/Country');
const Comment = require('../../../models/Comment');
const Hashtag = require('../../../models/Hashtag');
const { RequestError } = require('../../../lib/errors');

/* 
  POST /api/comments
*/

exports.postComment = async (req, res, next) => {
  try {
    const hashtagList = [];
    const { userId, countryId, contents, hashtags, created } = req.body;

    if (hashtags.length) await saveHashtag(hashtags);

    const comment = {
      author: userId,
      contents,
      hashtags: hashtagList,
      created,
      likes: []
    };
    const newComment = await Comment.create(comment);
    const country = await Country.findOne({ id: countryId });

    country.comments.push(newComment._id);
    country.save();

    async function saveHashtag(hashtags) {
      return Promise.all(
        hashtags.map(async (hashtag) => {
          let tag = await Hashtag.findOne({ hashtag });
          if (!tag) tag = await Hashtag.create({ hashtag });
          hashtagList.push(tag._id);
        })
      );
    }

    res.status(201).json({
      result: 'ok'
    });
  } catch (err) {
    next(new RequestError());
  }
};

/* 
  DELETE /api/comments/:comment_id
*/

exports.deleteComment = async (req, res, next) => {
  try {
    const { comment_id: commentId } = req.params;
    const countries = await Country.find();

    await Comment.findOneAndDelete({ _id: commentId });
    await deleteComments(countries);

    async function deleteComments(countries) {
      return Promise.all(
        countries.map(country => {
          if (country.comments.includes(commentId)) {
            country.comments.forEach(async (comment, index) => {
              if (String(comment) === commentId) {
                country.comments.splice(index, 1);
                await country.save();
              }
            });
          }
        })
      );
    }

    res.status(200).json({
      result: 'ok'
    });
  } catch (err) {
    next(new RequestError());
  }
};

/* 
  PUT /api/comments/:comment_id/like
*/

exports.likeCount = async (req, res, next) => {
  try {
    const { comment_id: commentId } = req.params;
    const { userId, isLike } = req.body;
    const comment = await Comment.findById(commentId);

    if (isLike) {
      comment.likes.push(userId);
    } else {
      comment.likes.forEach((user, index) => {
        if (String(user) === userId) {
          comment.likes.splice(index, 1);
        }
      });
    }

    comment.save();
  } catch (err) {
    next(new RequestError());
  }
};
