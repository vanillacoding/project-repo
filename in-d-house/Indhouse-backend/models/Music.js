const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: ObjectId,
    ref: "Artist",
    required: true,
  },
  genre: {
    type: ObjectId,
    ref: "Genre",
    required: true,
  },
  coverPhotoUrl: {
    type: String,
    required: true,
  },
  youtubeUrl: {
    type: String,
    required: true,
  },
  likeUser: [{
    userId: { type: ObjectId, ref: "User", required: true },
  }],
}, { timestamps: true });

module.exports = mongoose.model("Music", musicSchema);
