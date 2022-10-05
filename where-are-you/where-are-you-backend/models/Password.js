const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  object: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Password", passwordSchema);
