const mongoose = require("mongoose");
const validator = require("validator");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const getAverage = require("../utils/getAverage");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
    maxlength: 15,
    minlength: 2,
  },
  uids: [
    {
      type: String,
      validate: [validator.isAlphanumeric, "Please provide a valid uid"],
    },
  ],
  imagePath: {
    type: String,
    validate: [validator.isURL, "Please provide a valid url"],
  },
  beers: [
    {
      beer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beer",
        required: [true, "Please provide the beer mongoId"],
      },
      myBeerImageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
      },
    },
  ],
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

userSchema.virtual("averageRating").get(function () {
  return getAverage(this.totalRating, this.reviewCounts);
});

userSchema.virtual("averageBody").get(function () {
  return getAverage(this.totalBody, this.reviewCounts);
});

userSchema.virtual("averageAroma").get(function () {
  return getAverage(this.totalAroma, this.reviewCounts);
});

userSchema.virtual("averageSparkling").get(function () {
  return getAverage(this.totalSparkling, this.reviewCounts);
});

userSchema.plugin(mongooseLeanVirtuals);

userSchema.post(/^find/, function (docs, next) {
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

const User = mongoose.model("User", userSchema);

module.exports = User;
