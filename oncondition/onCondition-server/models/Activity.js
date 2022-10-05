const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const findOrCreate = require("mongoose-findorcreate");

const ratingSchema = require("./subDocuments/Rating");
const { isValidActivityType } = require("../routes/utils/validations");
const { ERROR } = require("../constants/messages");

const activitySchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: "hashed",
  },
  sessionId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validate: [isValidActivityType, ERROR.INVALID_ACTIVITY_TYPE],
  },
  rating: ratingSchema,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  }],
});

activitySchema.path("_id");
activitySchema.plugin(mongoosePaginate);
activitySchema.plugin(findOrCreate);

module.exports = mongoose.model("Activity", activitySchema);
