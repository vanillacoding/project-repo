const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  banner_url: { type: String, required: true },
  flag_url: { type: String, required: true },
  description: { type: Object, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Country', CountrySchema);
