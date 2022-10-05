import mongoose from 'mongoose';

const schema = mongoose.Schema({
  team: { type: mongoose.Types.ObjectId, ref: 'Team' },
  recorded_by: { type: mongoose.Types.ObjectId, ref: 'User' },
  work_on: {
    type: Date,
    default: Date.now,
    required: true
  },
  work_off: {
    type: Date
  },
  is_late: {
    type: Boolean,
    required: true
  }
});

export default mongoose.model('Record', schema);
