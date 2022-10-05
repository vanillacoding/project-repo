const Joi = require('joi');
const {
  commonErrorMessage,
  advertiserRegisterErrorMessage,
  createCampaignErrorMessage,
  paymentErrorMessage,
  campaignStatsErrorMessage,
} = require('../constants/joiErrorMessage');

exports.advertiserRegisterValidation = function (req, res, next) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .error(new Error(commonErrorMessage.INVALID_EMAIL)),
    name: Joi.string()
      .required()
      .error(new Error(commonErrorMessage.INVALID_NAME)),
    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])'))
      .required()
      .error(new Error(commonErrorMessage.INVALID_PASSWORD)),
    passwordConfirm: Joi.string()
      .min(8)
      .max(20)
      .valid(Joi.ref('password'))
      .required()
      .error(new Error(commonErrorMessage.INVALID_PASSWORDCONFIRM)),
    companyName: Joi.string()
      .required()
      .error(new Error(advertiserRegisterErrorMessage.INVALID_COMPANYNAME)),
    companyEmail: Joi.string()
      .email()
      .required()
      .error(new Error(advertiserRegisterErrorMessage.INVALID_COMPANYEMAIL)),
    companyRegistrationNumber: Joi.string()
      .pattern(new RegExp('([0-9]{3})-([0-9]{2})-([0-9]{5})'))
      .required()
      .error(new Error(advertiserRegisterErrorMessage.INVALID_COMPANYREGISTRATIONNUMBER)),
  });

  validateRequest(req, res, next, schema);
};

exports.userRegisterValidation = function (req, res, next) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .error(new Error(commonErrorMessage.INVALID_EMAIL)),
    name: Joi.string()
      .required()
      .error(new Error(commonErrorMessage.INVALID_NAME)),
    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])'))
      .required()
      .error(new Error(commonErrorMessage.INVALID_PASSWORD)),
    passwordConfirm: Joi.string()
      .min(8)
      .max(20)
      .valid(Joi.ref('password'))
      .required()
      .error(new Error(commonErrorMessage.INVALID_PASSWORDCONFIRM)),
  });

  validateRequest(req, res, next, schema);
};

exports.loginValidation = function (req, res, next) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .error(new Error(commonErrorMessage.INVALID_EMAIL)),
    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])'))
      .required()
      .error(new Error(commonErrorMessage.INVALID_PASSWORD)),
  });

  validateRequest(req, res, next, schema);
};

exports.createCampaignValidation = function (req, res, next) {
  const schema = Joi.object({
    title: Joi.string()
      .required()
      .error(new Error(createCampaignErrorMessage.INVALID_TITLE)),
    campaignType: Joi.string()
      .valid('banner', 'text', 'video')
      .required()
      .error(new Error(createCampaignErrorMessage.INVALID_CAMPAIGNTYPE)),
    expiresType: Joi.string()
      .valid('continue', 'expired')
      .required()
      .error(new Error(createCampaignErrorMessage.INVALID_EXPIRESTYPE)),
    content: Joi.string()
      .required()
      .error(new Error(createCampaignErrorMessage.INVALID_CONTENT)),
    expiresAt: Joi.date()
      .greater('now')
      .required()
      .error(new Error(createCampaignErrorMessage.INVALID_EXPIRESAT)),
    dailyBudget: Joi.number()
      .required()
      .error(new Error(createCampaignErrorMessage.INVALID_DAILYBUDGET)),
    campaignUrl: Joi.string()
      .required()
      .error(new Error(createCampaignErrorMessage.INVALID_CAMPAIGNURL)),
  });

  validateRequest(req, res, next, schema);
};

exports.paymentValidation = function (req, res, next) {
  const schema = Joi.object({
    imp_uid: Joi.string()
      .required()
      .error(new Error(paymentErrorMessage.INVALID_MP_UID)),
    merchant_uid: Joi.string()
      .required()
      .error(new Error(paymentErrorMessage.INVALID_MERCHANT_UID)),
  });

  validateRequest(req, res, next, schema);
};

exports.campaignStatsValidation = function (req, res, next) {
  const schema = Joi.object({
    campaignId: Joi.string()
      .required()
      .error(new Error(campaignStatsErrorMessage.INVALID_CAMPAIGNID)),
    type: Joi.string()
      .valid('reach', 'click')
      .required()
      .error(new Error(campaignStatsErrorMessage.INVALID_TYPE)),
  });

  validateRequest(req, res, next, schema);
};

async function validateRequest(req, res, next, schema) {
  const options = {
    abortEarly: true,
    allowUnknown: true,
  };

  try {
    await schema.validateAsync(req.body, options);

    next();
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
}
