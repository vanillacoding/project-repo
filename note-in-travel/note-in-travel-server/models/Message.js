const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  content: String,
  location: {
    latitude: {
      type: Number,
      required: [true, "latitude is required"],
    },
    longitude: {
      type: Number,
      required: [true, "longitude is required"],
    },
  },
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
