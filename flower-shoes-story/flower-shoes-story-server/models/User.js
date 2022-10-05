const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  partner_id: {
    type: String,
  },
  is_matched: {
    type: Boolean,
    default: false,
  },
  couple: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Couple",
  },
});

module.exports = mongoose.model("User", userSchema);
