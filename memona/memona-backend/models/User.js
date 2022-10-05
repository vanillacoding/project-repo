const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  posts: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Posts",
    }],
    default: [],
  },
  friends: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Users",
    }],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model("Users", userSchema);
