const Country = require('../../../models/Country');
const { NotFoundError, RequestError } = require('../../../lib/errors');

/* 
  GET /api/countries/:country_id
*/

exports.getCountryData = async (req, res, next) => {
  try {
    const { country_id: countryId } = req.params;
    const country = await Country.findOne({ id: countryId })
      .populate({
        path: 'comments',
        populate: [{ path: 'author' }],
      })
      .populate({
        path: 'comments',
        populate: [{ path: 'hashtags' }],
      });
    const {
      id,
      name,
      flag_url: flagUrl,
      banner_url: bannerUrl,
      description,
      likes,
      comments
    } = country;

    res.status(200).json({
      id,
      name,
      flagUrl,
      bannerUrl,
      description,
      likes,
      comments
    });
  } catch (err) {
    next(new NotFoundError());
  }
};

/* 
  PUT /api/countries/:country_id/like
*/

exports.likeCount = async (req, res, next) => {
  try {
    const { userId, isLike } = req.body;
    const { country_id: countryId } = req.params;
    const country = await Country.findOne({ id: countryId });

    if (isLike) {
      country.likes.push(userId);
    } else {
      country.likes.forEach((user, index) => {
        if (String(user) === userId) {
          country.likes.splice(index, 1);
        }
      });
    }

    country.save();
  } catch (err) {
    next(new RequestError());
  }
};
