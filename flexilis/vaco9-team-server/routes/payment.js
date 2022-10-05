const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const { paymentValidation } = require('../middlewares/validateInput');
const paymentController = require('../controllers/payment.controller');

const router = express.Router();

router.post('/verify', verifyToken, paymentValidation, paymentController.verifyPayment);

module.exports = router;
