const UsersService = require('../../services/UsersService');
const { getPhotoUrl } = require('../middlewares/uploadPhotos');
const { errorMessage } = require('../../constants/errorMessage');
const { statusMessage } = require('../../constants/statusMessage');

exports.savePhotos = async (req, res, next) => {
  try {
    const awsPhotoUrlList = getPhotoUrl(req.files);

    if (!awsPhotoUrlList.length) {
      throw new Error(err);
    }

    const { userId } = req.params;
    const {
      latitude,
      longitude,
      description,
      published_at,
      resistered_by
    } = req.body;

    const photosInfo = {
      resistered_by: resistered_by,
      location: [Number(latitude), Number(longitude)],
      photo_url_list: awsPhotoUrlList,
      description: description,
      published_at: published_at
    };

    const newPhoto = await UsersService.savePhoto(photosInfo);
    const { _id } = newPhoto;

    await UsersService.updatePhotos(userId, _id);

    return res.status(200).json({
      result: statusMessage.success
    });
  } catch (err) {
    err.message = errorMessage.invalidPhoto;

    next(err);
  }
};

exports.getPhotoListByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { limit, page } = req.query;

    const photos = await UsersService.getFifteenPhotos(userId, limit, page);

    return res.status(200).json({
      result: statusMessage.success,
      photos
    });
  } catch (err) {
    err.message = errorMessage.invalidPhotoList;

    next(err);
  }
};
