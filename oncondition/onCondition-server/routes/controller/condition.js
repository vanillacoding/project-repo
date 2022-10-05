const mongoose = require("mongoose");
const createError = require("http-errors");

const User = require("../../models/User");
const Activity = require("../../models/Activity");
const Sleep = require("../../models/Sleep");
const Meal = require("../../models/Meal");
const Album = require("../../models/CustomAlbum");
const Grid = require("../../models/CustomGrid");

const getISOTime = require("../utils/getISOTime");
const ACCESS_LEVELS = require("../../constants/accessLevels");
const { OK, UNAUTHORIZED } = require("../../constants/statusCodes");

async function getCondition(req, res, next) {
  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }
    const creator = mongoose.Types.ObjectId(req.userId);
    const today = new Date();
    const { pastMidnight, pastAMonthAgo } = getISOTime(today);

    const setDateRange = {
      $match: {
        creator,
        date: { $gte: pastAMonthAgo, $lte: pastMidnight },
      },
    };
    const groupByDate = {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        average: { $avg: "$rating.heartCount" },
      },
    };
    const sortByDate = { $sort: { _id: -1 } };
    const calculateTotalAverage = {
      $group: {
        _id: null,
        average: { $avg: "$average" },
        data: { $push: "$$ROOT" },
      },
    };
    const groupByDateAndCategory = {
      $group: {
        _id: {
          category: "$category",
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        },
        score: { $avg: "$rating.heartCount" },
      },
    };
    const sortByDateBeforePush = { $sort: { "_id.date": -1 } };
    const groupByCategory = {
      $group: {
        _id: "$_id.category",
        average: { $avg: "$score" },
        data: { $push: { _id: "$_id.date", average: "$score" } },
      },
    };

    const defaultDataPipeLine = [
      setDateRange,
      groupByDate,
      sortByDate,
      calculateTotalAverage,
    ];
    const customDataPipeLine = [
      setDateRange,
      groupByDateAndCategory,
      sortByDateBeforePush,
      groupByCategory,
    ];

    const [activity, meal, sleep, album, grid] = await Promise.all([
      Activity.aggregate(defaultDataPipeLine),
      Meal.aggregate(defaultDataPipeLine),
      Sleep.aggregate(defaultDataPipeLine),
      Album.aggregate(customDataPipeLine),
      Grid.aggregate(customDataPipeLine),
    ]);

    const { average: activityScore, data: activityData } = activity[0] || {};
    const { average: mealScore, data: mealData } = meal[0] || {};
    const { average: sleepScore, data: sleepData } = sleep[0] || {};
    const { averages: customScores, datas: customDatas } = [...album, ...grid]
      .reduce(({ averages, datas }, { _id: category, average, data }) => {
        return {
          averages: { ...averages, [category]: average },
          datas: { ...datas, [category]: data },
        };
      }, { averages: {}, datas: {} }) || {};

    const scores = {
      activity: activityScore || 0,
      meal: mealScore || 0,
      sleep: sleepScore || 0,
      ...customScores,
    };

    await User.findByIdAndUpdate(creator, { scores });

    const data = {
      activity: activityData || [],
      meal: mealData || [],
      sleep: sleepData || [],
      ...customDatas,
    };

    res.status(OK);
    res.json({ result: "ok", data, status: scores });
  } catch (err) {
    next(err);
  }
}

module.exports = { getCondition };
