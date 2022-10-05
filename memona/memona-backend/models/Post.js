const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const { pointSchema } = require("./GeoJsonSubSchemas");

const { Schema } = mongoose;

const postSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  content: {
    type: String,
    default: "",
  },
  postImageUrl: {
    type: String,
    required: true,
  },
  location: {
    type: pointSchema,
    required: true,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  area: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    require: true,
  },
  comments: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Comments",
    }],
    default: [],
  },
  likes: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Likes",
    }],
    default: [],
  },
}, { timestamps: true });

postSchema.index({ season: 1, area: 1, year: 1 });
postSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("Posts", postSchema);
