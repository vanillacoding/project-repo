const axios = require('axios');

const paymentService = require('../services/paymentService');
const Payment = require('../models/Payment');
const User = require('../models/User');

exports.createPayment = async (req, res, next) => {
  try {
    const { userId } = res.locals.userInfo;
    const { amount, productInfo } = req.body;
    const result = await paymentService.createPayment(userId, amount, productInfo);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.authenticatePayment = async (req, res, next) => {
  const { userId } = res.locals.userInfo;
  const { imp_success, imp_uid, merchant_uid } = req.query;
  const isPaymentSucceed = imp_success !== 'false';

  if (isPaymentSucceed) {
    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        imp_key: process.env.IAMPORT_KEY,
        imp_secret: process.env.IAMPORT_SECRET
      }
    });

    const { access_token } = getToken.data.response;
    const getPaymentInfo = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`,
      method: "get",
      headers: { "Authorization": access_token }
    });

    const paymentData = getPaymentInfo.data.response;
    const orderInfo = await Payment.findById(paymentData.merchant_uid);
    const amountToBePaid = orderInfo.amount;
    const promiseToBeUpdate = orderInfo.productInfo.amount;
    const { amount, status } = paymentData;

    if (amount === amountToBePaid) {
      await Payment.findByIdAndUpdate(
        merchant_uid,
        {
          $set: {
            paymentData,
            isVerified: true
          }
        }
      );

      const updatedUserInfo = await User.findByIdAndUpdate(
        userId,
        { $inc: { promise: promiseToBeUpdate } },
        { new: true }
      );

      const { nickname, promise } = updatedUserInfo;

      switch (status) {
        case 'ready':
          const { vbank_num, vbank_date, vbank_name } = paymentData;
          res.render('payment_result', {
            status: 'vbankIssued',
            message: '가상계좌 발급 성공'
          });
          break;
        case 'paid':
          res.render('payment_result', {
            status: 'success',
            message: '일반 결제 성공',
            nickname,
            purchasedPromise: promiseToBeUpdate,
            promise
          });
          break;
      }
    } else {
      throw { status: 'forgery', message: '위조된 결제시도' };
    }
  }
};
