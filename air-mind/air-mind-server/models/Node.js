const mongoose = require('mongoose');
const autoPopulate = require('mongoose-autopopulate');

const commentSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    content: { type: String, required: true },
    profile: { type: String, required: true },
  },
  { timestamps: true },
);

const nodeSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    images: {
      type: [
        {
          path: { type: String, required: true },
          originalName: { type: String, required: true },
        },
      ],
      default: [],
    },
    comments: [commentSchema],
    parent: { type: mongoose.Schema.Types.ObjectId },
    mindMap: { type: mongoose.Schema.Types.ObjectId },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Node',
        autopopulate: true,
      },
    ],
    attribute: {
      shape: { type: String, required: true, default: 'RoundedRec' },
      size: { type: String, required: true, default: 'MEDIUM' },
      cordX: { type: Number, required: true },
      cordY: { type: Number, required: true },
      color: { type: String, required: true, default: 'YELLOW' },
      isFold: { type: Boolean, required: true, default: 'false' },
    },
  },
  { timestamps: true },
);

nodeSchema.plugin(autoPopulate);

module.exports = mongoose.model('Node', nodeSchema);
