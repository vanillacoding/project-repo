const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const findOrCreate = require("mongoose-findorcreate");

const requestSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: "hashed",
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: "hashed",
  },
});

requestSchema.path("_id");
requestSchema.plugin(mongoosePaginate);
requestSchema.plugin(findOrCreate);

module.exports = mongoose.model("Request", requestSchema);
