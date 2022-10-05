const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String, required: true },
  testIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'test' }],
  origin: { type: String, required: true },
});

module.exports = mongoose.model('project', projectSchema);
