const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const findOrCreate = require("mongoose-findorcreate");

const stepSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: "hashed",
  },
  date: {
    type: Date,
    required: true,
  },
  count: {
    type: Number,
  },
});

stepSchema.path("_id");
stepSchema.plugin(mongoosePaginate);
stepSchema.plugin(findOrCreate);

module.exports = mongoose.model("Step", stepSchema);
