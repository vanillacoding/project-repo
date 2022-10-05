const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
  avatar: [{
    type: String,
  }],
  background: [{
    type: String,
  }],
});

module.exports = mongoose.model("Image", imageSchema);
