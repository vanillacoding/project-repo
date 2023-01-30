const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId },
  title: {
    type: String,
    required: true,
    validate(value) {
      if (value.length > 10) {
        throw new Error();
      }
    },
  },
  description: {
    type: String,
    validate(value) {
      if (value.length > 30) {
        throw new Error();
      }
    },
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Channel", channelSchema);
