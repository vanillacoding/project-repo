import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  display_name: {
    type: String,
    unique: true,
    required: true
  },
  thumbnail_pic: {
    type: String
  },
  created_by: {
    type: mongoose.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  location: {
    type: {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true }
    },
    required: true
  },
  work_on_time: {
    type: String,
    required: true
  },
  work_off_time: {
    type: String,
    required: true
  },
  participants: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  admins: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  threads: [{ type: mongoose.Types.ObjectId, ref: 'Thread' }],
  records: [{ type: mongoose.Types.ObjectId, ref: 'Record' }],
  thumbnail: { type: String }
});

export default mongoose.model('Team', schema);
