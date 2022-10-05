const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Genre", genreSchema);
