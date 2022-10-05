import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  recycleScore: {
    type: Number,
    default: 0,
    required: true,
  },
  preferenceScore: {
    type: Number,
    default: 0,
    required: true,
  },
  comment: String,
  picture: String,
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
