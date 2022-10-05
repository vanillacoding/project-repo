const mongoose = require('mongoose');

const userByAgeSchema = new mongoose.Schema({
  country: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  reach: {
    type: Number,
    default: 0,
    required: true,
  },
  click: {
    type: Number,
    default: 0,
    required: true,
  },
  basicReachPrice: {
    type: Number,
    required: true,
  },
  usedBudget: {
    type: Number,
    default: 0,
    required: true,
  },
  userCount: {
    type: Number,
    default: 0,
    required: true,
  },
  targetedCount: {
    type: Number,
    default: 0,
    required: true,
  },
});

userByAgeSchema.virtual('cpmcpmcpm').get(function() {
  return this.usedBudget / this.reach * 1000;
});

userByAgeSchema.virtual('cpccpccpc').get(function() {
  return this.usedBudget / this.click;
});

module.exports = mongoose.model('UserByAge', userByAgeSchema);
