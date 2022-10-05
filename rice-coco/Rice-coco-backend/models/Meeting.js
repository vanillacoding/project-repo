const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const LocationSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const RestaurantSchema = new Schema({
  restaurantId: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: LocationSchema, required: true },
});

const ChatSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  nickname: { type: String, required: true },
  message: { type: String, required: true },
});

const ParticipantSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'User' },
});

const MeetingSchema = new Schema(
  {
    restaurant: { type: RestaurantSchema, required: true },
    expiredTime: { type: Date },
    isMatched: { type: Boolean, default: false },
    isFinished: { type: Boolean, default: false },
    participant: [{ type: ParticipantSchema, required: true }],
    chat: [{ type: ChatSchema }],
  },
  schemaOptions
);

MeetingSchema.pre('save', function (next) {
  this.expiredTime = new Date(Date.now() + 60 * 60 * 1000);
  next();
});

module.exports = mongoose.model('Meeting', MeetingSchema);
