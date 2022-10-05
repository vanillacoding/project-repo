const mongoose = require("mongoose");
const validator = require("validator");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide the user mongoId"],
  },
  beer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beer",
    required: [true, "Please provide the beer mongoId"],
  },
  createdAt: {
    type: Date,
    required: [true, "Please provide the written date"],
    validate: [validator.isDate, "Please provide a valid written date"],
  },
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
    min: [0.5, "Rating must be greater than or equal to 0.5"],
    max: [5, "Rating must be smaller than or equal to 5.0"],
    required: [true, "Please provide the rating"],
  },
  body: {
    type: Number,
    default: 0,
    min: [0, "Rating must be greater than or equal to 0"],
    max: [10, "Rating must be smaller than or equal to 10"],
    required: [true, "Please provide the body"],
  },
  aroma: {
    type: Number,
    default: 0,
    min: [0, "Rating must be greater than or equal to 0"],
    max: [10, "Rating must be smaller than or equal to 10"],
    required: [true, "Please provide the aroma"],
  },
  sparkling: {
    type: Number,
    default: 0,
    min: [0, "Rating must be greater than or equal to 0"],
    max: [10, "Rating must be smaller than or equal to 10"],
    required: [true, "Please provide the sparkling"],
  },
});

reviewSchema.statics.getComments = function (id, isUser) {
  try {
    const match = isUser
      ? { user: mongoose.Types.ObjectId(id) }
      : { beer: mongoose.Types.ObjectId(id) };
    return Review.find(match)
      .select("user comment rating")
      .populate("user", "name imagePath");
  } catch (err) {
    return err;
  }
};

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
