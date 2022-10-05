const createError = require('http-errors');

const Video = require('../models/Video');
const { videosResponseMessage } = require('../constants/responseMessage');

exports.video = async function (req, res, next) {
  try {
    const videos = await Video.find();

    res.json({
      code: 200,
      message: videosResponseMessage.GET_VIDEOS_SUCCESS_RESPONSE,
      data: {
        videos,
      },
    });
  } catch (err) {
    next(createError(500, err));
  }
};
