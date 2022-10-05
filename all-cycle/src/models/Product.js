import mongoose from "mongoose";
import Review from "@/models/Review";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  imgAlt: {
    type: String,
    required: true,
  },
  searchCount: {
    type: Number,
    default: 0,
  },
  recycleType: {
    type: String,
    enum: ["pet", "glass", "aluminum", "etc"],
    default: "etc",
  },
  productType: {
    type: String,
    enum: ["ion", "soft", "juice", "water", "coffee", "etc"],
    default: "etc",
  },
  recycleScoreAvg: {
    type: Number,
    default: 3,
  },
  preferenceScoreAvg: {
    type: Number,
    default: 3,
  },
  reviewers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", productSchema);
