const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trin: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Artist", artistSchema);
