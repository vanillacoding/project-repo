const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  profileUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastAccessDate: {
    type: Date,
    default: new Date(),
  },
  stroke: {
    type: Number,
  },
  scores: {
    type: Object,
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  customCategories: {
    type: Array,
  },
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
