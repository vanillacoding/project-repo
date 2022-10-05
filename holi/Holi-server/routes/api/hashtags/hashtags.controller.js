const Comment = require('../../../models/Comment');
const Hashtag = require('../../../models/Hashtag');
const { NotFoundError } = require('../../../lib/errors');

/* 
  GET /api/hashtags/:hashtag_id
*/

exports.getHashtagList = async (req, res, next) => {
  try {
    const hashtagList = [];
    const { hashtag_id: hashtagId } = req.params;
    const hahstag = await Hashtag.findById(hashtagId);
    const comments = await Comment.find()
      .populate('hashtags')
      .populate('author');

    comments.forEach(comment => {
      comment.hashtags.forEach(hashtag => {
        if (String(hashtag._id) === hashtagId) {
          hashtagList.push(comment);
        }
      });
    });

    res.status(200).json({
      hashtag: hahstag.hashtag,
      hashtagList
    });
  } catch (err) {
    next(new NotFoundError());
  }
};
