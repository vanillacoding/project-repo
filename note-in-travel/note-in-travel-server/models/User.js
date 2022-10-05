const mongoose = require("mongoose");

const defaultPhotoUrl = "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    required: [true, "email is required"],
  },
  name: {
    type: String,
    requiredL: [true, "name is required"],
  },
  photoUrl: {
    type: String,
    default: defaultPhotoUrl,
  },
  favoriteCourses: [{
    type: mongoose.Types.ObjectId,
    ref: "Course",
  }],
  favoriteSites: [{
    type: mongoose.Types.ObjectId,
    ref: "Site",
  }],
  myCourses: [{
    type: mongoose.Types.ObjectId,
    ref: "Course",
  }],
});

module.exports = mongoose.model("User", userSchema);
