const mongoose = require("mongoose");
const { Schema } = mongoose;

const streamingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  streamer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  thumnail: {
    type: String,
  },
  viewers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
});

const Streaming = mongoose.model("Streaming", streamingSchema);

module.exports = Streaming;
