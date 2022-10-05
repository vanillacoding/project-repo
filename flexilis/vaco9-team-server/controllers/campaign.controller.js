const createError = require('http-errors');
const _ = require('lodash');

const Campaign = require('../models/Campaign');
const Advertiser = require('../models/Advertiser');
const User = require('../models/User');
const UserStats = require('../models/UserStats');
const UserByAge = require('../models/UserByAge');
const { campaignErrorMessage } = require('../constants/controllerErrorMessage');
const { campaignResponseMessage } = require('../constants/responseMessage');

exports.createCampaign = async function (req, res, next) {
  try {
    const countries = req.body.country.map(country => country.value);
    const newCampaign = await Campaign.create({
      ...req.body,
      country: countries,
      campaignUrl: `http://${req.body.campaignUrl}`,
      remainingBudget: req.body.dailyBudget,
    });

    await Advertiser.findByIdAndUpdate(
      req.id,
      { $addToSet: { campaigns: newCampaign._id } }
    );

    await UserStats.updateMany(
      { country: { $in: [...countries] } },
      { $inc: { countryTargetedCount: req.body.maxAge - req.body.minAge + 1 } }
    );

    await UserByAge.updateMany(
      {
        age: { $gte: Number(req.body.minAge), $lte: Number(req.body.maxAge) },
        country: { $in: [...countries] },
        gender: req.body.gender === 'both' ? { $in: ['male', 'female'] } : req.body.gender,
      },
      { $inc: { targetedCount: 1 } }
    );

    res.json({
      code: 200,
      message: campaignResponseMessage.CREATE_CAMPAIGN_SUCCESS_RESPONSE,
      data: {
        merchantId: newCampaign._id,
      },
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.getAdvertiserCampaigns = async function (req, res, next) {
  try {
    const advertiser = await Advertiser
      .findById(req.id)
      .populate('campaigns')
      .lean();

    if (!advertiser) {
      return next(createError(400), campaignErrorMessage.NONEXISTENT_ADVERTISER_ERROR);
    }

    res.json({
      code: 200,
      message: campaignResponseMessage.GET_CAMPAIGN_SUCCESS_RESPONSE,
      data: {
        campaigns: advertiser.campaigns,
      },
    });
  } catch (error) {
    next(createError(500, error));
  }
};

exports.getCampaignPopUp = async function (req, res, next) {
  try {
    const currentUser = await User.findById(req.id);
    const openedCampaigns = await Campaign.find({
      status: 'opened',
      country: { $elemMatch: { $eq: currentUser.country } },
      gender: { $in: [currentUser.gender, 'both'] },
      minAge: { $lte: currentUser.age },
      maxAge: { $gte: currentUser.age },
      remainingBudget: { $gte: 0 },
    }).lean();

    if (!openedCampaigns.length) {
      return res.json({
        code: 200,
        message: campaignResponseMessage.NO_CAMPAIGN_WITH_REMAININGBUDGET_LEFT_RESPONSE,
      });
    }

    const {
      _id,
      content,
      campaignUrl
    } = getRandomCampaign(openedCampaigns);

    res.json({
      code: 200,
      message: campaignResponseMessage.GET_CAMPAIGN_POPUP_SUCCESS_RESPONSE,
      data: {
        campaignId: _id,
        content,
        campaignUrl,
      },
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.updateCampaignStats = async function (req, res, next) {
  try {
    const { campaignId, type } = req.body;
    const currentUser = await User.findById(req.id);
    const targetAge = await UserByAge.findOne({
      country: currentUser.country,
      age: currentUser.age,
      gender: currentUser.gender,
    });
    const targetCountry = await UserStats.findOne({
      country: currentUser.country,
    });
    let reachCost = 0;

    if ((targetAge.targetedCount / targetCountry.countryTargetedCount) > 0.04) {
      reachCost = targetAge.basicReachPrice * 1.2;
    } else if ((targetAge.targetedCount / targetCountry.countryTargetedCount) > 0.02) {
      reachCost = targetAge.basicReachPrice * 1.1;
    } else if ((targetAge.targetedCount / targetCountry.countryTargetedCount) < 0.01) {
      reachCost = targetAge.basicReachPrice * 0.9;
    } else {
      reachCost = targetAge.basicReachPrice;
    }

    if (type === 'reach') {
      await UserByAge.findOneAndUpdate({
        country: currentUser.country,
        age: currentUser.age,
        gender: currentUser.gender,
      }, {
        $inc: { reach: 1, usedBudget: reachCost },
      });
      await Campaign.addReachCount(campaignId, currentUser, reachCost);
    } else if (type === 'click') {
      await UserByAge.findOneAndUpdate({
        country: currentUser.country,
        age: currentUser.age,
        gender: currentUser.gender,
      }, {
        $inc: { click: 1 },
      });
      await Campaign.addClickCount(campaignId, currentUser, reachCost);
    }

    res.json({
      code: 200,
      message: campaignResponseMessage.UPDATE_CAMPAIGN_STATS_SUCCESS,
    });
  } catch (error) {
    next(createError(500, error));
  }
};

exports.getEstimateStats = async function (req, res, next) {
  try {
    const { minAge, maxAge, gender, country } = req.body;
    const countries = country.map(country => country.value);

    const targets = await UserByAge.find({
      country: { $in: [...countries] },
      age: {
        $lte: Number(maxAge),
        $gte: Number(minAge),
      },
      gender: gender === 'both' ? { $or: ['male', 'female'] } : gender,
    });

    const { cpm, cpc, userCount, ctr } = targets.reduce((acc, cur) => {
      acc.cpm += (cur.usedBudget / cur.reach * 1000);
      acc.cpc += (cur.usedBudget / cur.click);
      acc.userCount += cur.userCount;
      acc.ctr += (cur.click / cur.reach);
      return acc;
    }, {'cpm': 0, 'cpc': 0, 'userCount': 0, 'ctr': 0});

    res.json({
      cpm: cpm / targets.length,
      cpc: cpc / targets.length,
      userCount,
      ctr: ctr / targets.length,
    });
  } catch (error) {
    next(createError(500, error));
  }
};

function getRandomCampaign(campaigns) {
  const randomCampaignIndex = Math.floor(Math.random() * campaigns.length);

  return campaigns[randomCampaignIndex];
}
