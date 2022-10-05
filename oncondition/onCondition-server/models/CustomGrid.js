const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ratingSchema = require("./subDocuments/Rating");

const customGridSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: "hashed",
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  rating: {
    type: ratingSchema,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  }],
});

customGridSchema.path("_id");
customGridSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("CustomGrid", customGridSchema);
