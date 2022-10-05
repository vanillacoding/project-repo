const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  artist: {
    type: String,
    required: [true, "Please provide a title"],
  },
  id: {
    type: String,
    required: [true, "Please provide a trackId"],
  },
  date: {
    type: Date,
  },
  duration: {
    type: Number,
    required: [true, "Please provide a duration"],
  },
  genres: {
    type: Array,
    default: [],
  },
  energy: {
    type: Number,
    default: 0,
  },
  uri: {
    type: String,
    required: [true, "Please provide a uri"],
  },
  albumImg: {
    type: Array,
    required: [true, "Please provide a albumUrl"],
  },
  preview: {
    type: String,
    required: [true, "Please provide a externalUrl"],
  },
}, { timestamps: true });

module.exports = mongoose.model("Track", TrackSchema);
