const mongoose = require('mongoose');

const { Schema } = mongoose;

const testSchema = new Schema({
  name: { type: String, required: true },
  uniqId: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
  clickEvent: [Object],
  conversion: Number,
  visitIds: Array,
  visit_count: Number,
  revisit_count: Number,
  url: String,
});

module.exports = mongoose.model('tests', testSchema);
