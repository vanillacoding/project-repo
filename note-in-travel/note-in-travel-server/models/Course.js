const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  isShared: {
    type: Boolean,
    default: false,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  name: String,
  region: {
    latitude: {
      type: Number,
      required: [true, "latitude is required"],
    },
    longitude: {
      type: Number,
      required: [true, "longitude is required"],
    },
    latitudeDelta: Number,
    longitudeDelta: Number,
  },
  schedules: [{
    index: Number,
    site: {
      type: mongoose.Types.ObjectId,
      ref: "Site",
    },
  }],
  messages: [{
    type: mongoose.Types.ObjectId,
    ref: "Message",
  }],
  favorites: [{
    type: mongoose.Types.ObjectId,
    ref: "User",
  }],
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
