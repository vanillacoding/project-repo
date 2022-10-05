import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comments: [
      {
        author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true }
      }
    ],
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true }]
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default mongoose.model('Thread', schema);
