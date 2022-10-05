import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  history: [String],
  recycleScore: {
    type: Number,
    default: 0,
  },
  pictures: [String],
  badges: [String],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
