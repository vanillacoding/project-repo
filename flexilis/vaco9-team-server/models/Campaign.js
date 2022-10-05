const mongoose = require('mongoose');
const { endOfDay, startOfDay } = require('date-fns');

const campaignSchema = new mongoose.Schema({
  advertiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Advertiser',
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  campaignType: {
    type: String,
    trim: true,
    enum: ['banner', 'text', 'video'],
    required: true,
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
  expiresType: {
    type: String,
    trim: true,
    enum: ['continue', 'expired'],
    required: true,
  },
  expiresAt: {
    type: Date,
  },
  dailyBudget: {
    type: Number,
    required: true,
  },
  remainingBudget: {
    type: Number,
    required: true,
  },
  campaignUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['opened', 'closed', 'pending'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'trans', 'phone'],
    default: 'card',
  },
  country: [{
    type: String,
    trim: true,
    required: true,
  }],
  minAge: {
    type: Number,
    required: true,
  },
  maxAge: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  stats: [{
    date: {
      type: Date,
      index: true,
    },
    reach: {
      type: Number,
      default: 0,
    },
    click: {
      type: Number,
      default: 0,
    },
    usedBudget: {
      type: Number,
      default: 0,
    },
  }],
  exposed: [{
    reach: {
      type: Number,
      default: 0,
    },
    click: {
      type: Number,
      default: 0,
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
    country: {
      type: String,
      trim: true,
      required: true,
    },
  }],
});

campaignSchema.statics.addStatsIfDoesNotExist = async function (id, date) {
  const isTodayStatsExist = await this.exists({
    _id: id,
    'stats.date': {
      $gte: startOfDay(date),
      $lte: endOfDay(date)
    }
  });

  if (!isTodayStatsExist) {
    return this.findByIdAndUpdate(
      id,
      { $addToSet: { stats: { date: startOfDay(date) } } }
    );
  }
};

campaignSchema.statics.addExposedIfDoesNotExist = async function (id, age, gender, country) {
  const isTodayExposedExist = await this.exists(
    {
      _id: id,
      'exposed.age': age,
      'exposed.gender': gender,
      'exposed.country': country,
    }
  );

  if (!isTodayExposedExist) {
    return this.findByIdAndUpdate(
      id,
      { $addToSet: { exposed: {
        age,
        gender,
        country,
      }}}
    );
  }
};

campaignSchema.statics.addReachCount = async function (id, user, cost) {
  const today = new Date();

  await this.addStatsIfDoesNotExist(id, today);
  await this.addExposedIfDoesNotExist(id, user.age, user.gender, user.country);

  await this.findOneAndUpdate(
    {
      _id: id,
      'exposed.age': user.age,
      'exposed.gender': user.gender,
      'exposed.country': user.country,
    },
    {
      $inc: { 'exposed.$.reach': 1 }
    }
  );

  await this.findOneAndUpdate(
    {
      _id: id,
      'stats.date': {
        $gte: startOfDay(today),
        $lte: endOfDay(today)
      }
    },
    {
      $inc: { 'stats.$.reach': 1, 'stats.$.usedBudget': cost, remainingBudget: -cost }
    }
  );
};

campaignSchema.statics.addClickCount = async function (id, user, cost) {
  const today = new Date();

  await this.addStatsIfDoesNotExist(id, today);
  await this.addExposedIfDoesNotExist(id, user.age, user.gender, user.country);

  await this.findOneAndUpdate(
    {
      _id: id,
      'exposed.age': user.age,
      'exposed.gender': user.gender,
      'exposed.country': user.country,
    },
    {
      $inc: { 'exposed.$.click': 1 }
    }
  );

  await this.findOneAndUpdate(
    {
      _id: id,
      'stats.date': {
        $gte: startOfDay(today),
        $lte: endOfDay(today)
      }
    },
    {
      $inc: { 'stats.$.click': 1, 'stats.$.usedBudget': cost, remainingBudget: -cost }
    }
  );
};

module.exports = mongoose.model('Campaign', campaignSchema);
