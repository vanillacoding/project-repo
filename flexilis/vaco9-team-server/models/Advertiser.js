const mongoose = require('mongoose');

const advertiserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  companyName: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  companyEmail: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  companyRegistrationNumber: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  campaigns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  }],
});

advertiserSchema.statics.checkIsAdvertiserExist =  function ({ email, companyName, companyEmail, companyRegistrationNumber }) {
  return this.exists({ $or: [{ email }, { companyName }, { companyEmail }, { companyRegistrationNumber }] });
};

module.exports = mongoose.model('Advertiser', advertiserSchema);
