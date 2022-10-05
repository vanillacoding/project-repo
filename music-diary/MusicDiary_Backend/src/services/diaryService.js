const Diary = require("../models/Diary");
const User = require("../models/User");

exports.addDiaryService = async (hashTag, address, geoLocation, userId) => {
  try {
    const newDiary = await Diary.create({
      hashTag,
      address,
      geoLocation,
    });

    const addedUserPrivateDiary = await User.findOneAndUpdate(
      { id: userId },
      { $push: { privateDiaryList: newDiary._id } },
      { upsert: true, new: true }
    );

    return { newDiary };
  } catch (err) {
    return { addDiaryServiceError: err };
  }
};

exports.orderDiaryByDateService = async (userId) => {
  try {
    const diaryByDate = await User.findOne({ id: userId }).populate({
      path: "privateDiaryList",
      populate: [{
        path: "playList",
        model: "Track",
      }],
      options: { sort: { "createdAt": -1 } },
    });

    return { diaryByDate };
  } catch (err) {
    return { orderDiaryByDateServiceError: err };
  }
};

