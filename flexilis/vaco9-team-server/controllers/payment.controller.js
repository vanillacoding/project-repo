const createError = require('http-errors');
const axios = require('axios');
const { differenceInCalendarDays } = require('date-fns');

const Campaign = require('../models/Campaign');
const { paymentErrorMessage } = require('../constants/controllerErrorMessage');

exports.verifyPayment = async function (req, res, next) {
  try {
    const { imp_uid, merchant_uid } = req.body;
    const currentCampaign = await Campaign.findById(merchant_uid);
    const campaignDuration = differenceInCalendarDays(currentCampaign.expiresAt, new Date());
    const amountToBePaid = currentCampaign.dailyBudget * campaignDuration;

    const getToken = await axios({
      url: process.env.IAMPORT_TOKEN_URL,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        imp_key: process.env.IAMPORT_REST_API,
        imp_secret: process.env.IAMPORT_REST_API_SECRET,
      },
    });

    const { access_token } = getToken.data.response;

    const getPaymentData = await axios({
      url: process.env.IAMPORT_PAYMENTS_URL + `${imp_uid}`,
      method: 'get',
      headers: { 'Authorization': access_token },
    });

    const paymentData = getPaymentData.data.response;
    const { amount, status } = paymentData;

    if (amount === amountToBePaid) {
      await Campaign.findByIdAndUpdate(merchant_uid, { status: 'opened' });

      if (status === 'paid') {
        res.json({
          code: 200,
          message: '',
        });
      }
    } else {
      next(createError(400, paymentErrorMessage.FAILED_TO_PAY_ERROR));
    }
  } catch (err) {
    next(createError(500, err));
  }
};
