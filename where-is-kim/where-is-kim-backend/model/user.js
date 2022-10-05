import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const schema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  teams: [{ type: mongoose.Types.ObjectId, ref: 'Team' }],
  profile: { type: String }
});

schema.plugin(passportLocalMongoose, { usernameField: 'email' });

export default mongoose.model('User', schema);
