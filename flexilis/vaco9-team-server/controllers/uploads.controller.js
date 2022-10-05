const createError = require('http-errors');

const { uploadsResponseMessage } = require('../constants/responseMessage');

exports.uploadImage = async function (req, res, next) {
  try {
    const imageUrl = req.file.location;

    res.json({
      code: 200,
      message: uploadsResponseMessage.UPLOAD_IMAGE_SUCCESS_RESPONSE,
      data: {
        url: imageUrl,
      },
    });
  } catch (error) {
    next(createError(500, error));
  }
};
