const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const hashtagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  snippetList: [{
    type: ObjectId,
    required: true,
  }],
});

module.exports = mongoose.model("Hashtag", hashtagSchema);
