const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ratingSchema = require("./subDocuments/Rating");
const { isValidUrl } = require("../routes/utils/validations");
const { ERROR } = require("../constants/messages");

const customAlbumSchema = new mongoose.Schema({
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
  url: {
    type: String,
    validate: [ isValidUrl, ERROR.INVALID_URL],
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

customAlbumSchema.path("_id");
customAlbumSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("CustomAlbum", customAlbumSchema);
