const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  couple: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Couple",
  },
  messages: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    }
  }],
});

module.exports = mongoose.model("Message", messageSchema);
