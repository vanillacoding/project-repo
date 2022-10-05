const mongoose = require('mongoose');
const { BadRequestError } = require('../lib/errors');

const schemaOption = {
  timestamps: true,
};

const sunGuageSchema = new mongoose.Schema({
  defaultGuage: {
    type: Number,
    required: [true, 'Default score is required'],
  },
  currentGuage: {
    type: Number,
    default: 0,
  },
});

const wateringGuageSchema = new mongoose.Schema({
  defaultGuage: {
    type: Number,
    required: [true, 'Default score is required'],
  },
  currentGuage: {
    type: Number,
    default: 0,
  },
});

const plantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User id is required'],
    },
    name: {
      type: String,
      required: [true, 'Plant name is required'],
    },
    species: {
      type: String,
      required: [true, 'Species is required'],
    },
    type: {
      type: String,
      required: [true, 'plant Type is required'],
    },
    isBlindUp: {
      type: Boolean,
      default: true,
    },
    growthStage: {
      type: Number,
      enum: [1, 2, 3],
      required: [true, 'Growth stage is required'],
    },
    penaltyPoints: {
      type: Number,
      default: 0,
      min: [0, 'Penalty points should be more than 1'],
      max: [10, 'Penalty points should be less than 10'],
    },
    isSunPlant: {
      type: Boolean,
      default: true,
      required: [true, 'Lighting environment is required'],
    },
    sunGuage: {
      type: sunGuageSchema,
    },
    waterGuage: {
      type: wateringGuageSchema,
    },
    isDead: {
      type: Boolean,
      default: false,
    },
  },
  schemaOption,
);

plantSchema.index({ name: 1 }, { unique: true });

plantSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new BadRequestError('Plant name is already exist.'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('Plant', plantSchema);
