const { addDiaryService, orderDiaryByDateService } = require("../../../services/diaryService");

exports.addNewDiary = async (req, res, next) => {
  try {
    const { hashTag, address, geoLocation } = req.body.newDiaryInfo;
    const userId = req.params.user_id;

    const { newDiary } = await addDiaryService(hashTag, address, geoLocation, userId);

    return res.json({
      result: "ok",
      data: {
        newDiary: {
          _id: newDiary._id,
          date: newDiary.date,
          hashTag: newDiary.hashTag,
          address: newDiary.address,
          geoLocation: newDiary.geoLocation,
          playList: newDiary.playList,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getDiaryByDate = async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    const { diaryByDate } = await orderDiaryByDateService(userId);

    return res.json({
      result: "ok",
      data: {
        diaryByDate: diaryByDate.privateDiaryList,
      },
    });
  } catch (err) {
    next(err);
  }
};
