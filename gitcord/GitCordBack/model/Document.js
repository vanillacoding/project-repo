const mongoose = require("mongoose");

const Document = new mongoose.Schema({
  title: {
    type: String,
    default: ""
  },
  contents: {
    type: String,
    default: ""
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Document", Document);
