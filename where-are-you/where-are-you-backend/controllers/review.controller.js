const createError = require("http-errors");
const Review = require("../models/Review");

exports.getReivews = async (req, res, next) => {
  try {
    const { page } = req.query;
    const limit = 6;
    const offset = (page - 1) * limit;
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);

    res.status(200).json({
      result: "ok",
      data: reviews
    });
  } catch (err) {
    next(createError(500, "Can't get reviews"));
  }
};

exports.postReview = async (req, res, next) => {
  try {
    const review = new Review(req.body);

    await review.save();

    res.status(200).json({
      result: "ok",
      data: review
    });
  } catch (err) {
    next(createError(500, "Can't post review"));
  }
};
