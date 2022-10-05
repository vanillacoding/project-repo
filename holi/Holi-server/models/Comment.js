const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contents: { type: String, required: true },
  created: { type: Date, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  hashtags: [{ type: Schema.Types.ObjectId, ref: 'Hashtag' }]
});

module.exports = mongoose.model('Comment', CommentSchema);
