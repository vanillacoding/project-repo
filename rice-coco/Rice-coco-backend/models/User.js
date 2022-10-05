const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const LocationSchema = new Schema({
  lng: { type: Number, required: true },
  lat: { type: Number, required: true },
});

const PreferredPartnerSchema = new Schema({
  birthYear: { type: String, required: true },
  gender: { type: String, required: true },
  occupation: { type: String, required: true },
});

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    nickname: { type: String, required: true },
    gender: { type: String, required: true },
    birthYear: { type: String, required: true },
    occupation: { type: String, required: true },
    preferredPartner: { type: PreferredPartnerSchema },
    favoritePartners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    history: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }],
    promise: { type: Number, default: 5 },
    payment: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
    location: { type: LocationSchema },
  },
  schemaOptions
);

module.exports = mongoose.model('User', UserSchema);
