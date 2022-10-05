const User = require('../models/User');
const Photo = require('../models/Photo');

const UsersService = {
  savePhoto: async (photosInfo) => {
    const newPhoto = await Photo.create(photosInfo);

    return newPhoto;
  },
  updatePhotos: async (userId, newPhotoId) => {
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { photos: newPhotoId } }
    );
  },
  getFifteenPhotos: async (userId, limit, page) => {
    const fifteenPhotos = await Photo.find({ resistered_by: userId })
                                     .skip(page > 0 ? (page - 1) * limit : 0)
                                     .limit(15);

    return fifteenPhotos;
  }
};

module.exports = UsersService;
