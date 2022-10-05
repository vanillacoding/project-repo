const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const HistorySchema = new Schema({
  users: [{
    id: {
      type: ObjectId,
      ref: 'User',
    },
    clearTime: {
      type: Number,
      default: null,
    },
    lastSolvedQuiz: {
      type: Number,
      default: -1,
    },
  }],
  game: {
    id: {
      type: ObjectId,
      ref: 'Game',
    },
    name: {
      type: String,
    },
  },
}, {
  timestamps: true,
});

HistorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('History', HistorySchema);
