const mongoose = require("mongoose");
const validator = require("validator");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const getAverage = require("../utils/getAverage");

const beerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us beer name!"],
  },
  imagePath: {
    type: String,
    required: [true, "Please provide your url"],
    validate: [validator.isURL, "Please provide a valid url"],
  },
  description: {
    type: String,
    required: [true, "Please tell us beer description!"],
  },
  reviewCounts: {
    type: Number,
    default: 0,
    min: [0, "review counts should me bigger than 0"],
  },
  totalRating: {
    type: Number,
    default: 0,
    min: [0, "review counts should me bigger than 0"],
  },
  totalBody: {
    type: Number,
    default: 0,
    min: [0, "review counts should me bigger than 0"],
  },
  totalAroma: {
    type: Number,
    default: 0,
    min: [0, "review counts should me bigger than 0"],
  },
  totalSparkling: {
    type: Number,
    default: 0,
    min: [0, "review counts should me bigger than 0"],
  },
});

beerSchema.virtual("averageRating").get(function () {
  return getAverage(this.totalRating, this.reviewCounts);
});

beerSchema.virtual("averageBody").get(function () {
  return getAverage(this.totalBody, this.reviewCounts);
});

beerSchema.virtual("averageAroma").get(function () {
  return getAverage(this.totalAroma, this.reviewCounts);
});

beerSchema.virtual("averageSparkling").get(function () {
  return getAverage(this.totalSparkling, this.reviewCounts);
});

beerSchema.plugin(mongooseLeanVirtuals);

beerSchema.post(/^find/, function (docs, next) {
  if (!docs) {
    return next();
  }

  if (!Array.isArray(docs)) {
    delete docs.totalRating;
    delete docs.totalBody;
    delete docs.totalAroma;
    delete docs.totalSparkling;
    return next();
  }

  docs.forEach((doc) => {
    delete doc.totalRating;
    delete doc.totalBody;
    delete doc.totalAroma;
    delete doc.totalSparkling;
  });

  return next();
});

const Beer = mongoose.model("Beer", beerSchema);

module.exports = Beer;
