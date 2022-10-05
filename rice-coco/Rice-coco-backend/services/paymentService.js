const Payment = require('../models/Payment');
const User = require('../models/User');

exports.createPayment = async (userId, amount, productInfo) => {
  try {
    const payment = await Payment.create({
      buyer: userId,
      amount,
      productInfo,
    });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { payment: payment._id },
    });

    return payment;
  } catch (error) {
    throw new Error(error);
  }
};
