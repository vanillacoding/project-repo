const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const findOrCreate = require("mongoose-findorcreate");

const ratingSchema = require("./subDocuments/Rating");

const sleepSchema = new mongoose.Schema({
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
  },
  rating: ratingSchema,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  }],
});

sleepSchema.path("_id");
sleepSchema.plugin(mongoosePaginate);
sleepSchema.plugin(findOrCreate);

module.exports = mongoose.model("Sleep", sleepSchema);
