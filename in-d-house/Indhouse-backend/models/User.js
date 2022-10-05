const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  photoUrl: {
    type: String,
    default: "https://in-d-house.s3.ap-northeast-2.amazonaws.com/user-profile-photo/1620828402457defaultUserPhoto.png",
  },
  likeMusic: [{
    musicId: { type: ObjectId, ref: "Music", required: true },
    createdAt: { type: Date, required: true },
  }],
  likeGenre: [{
    genreId: { type: ObjectId, ref: "Genre", required: true },
  }],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
