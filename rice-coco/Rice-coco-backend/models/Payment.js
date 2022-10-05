const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const PaymentSchema = new Schema(
  {
    buyer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    amount: { type: Number, required: true },
    productInfo: { name: String, amount: Number },
    isVerified: { type: Boolean, default: false },
  },
  schemaOptions
);

module.exports = mongoose.model('Payment', PaymentSchema);
