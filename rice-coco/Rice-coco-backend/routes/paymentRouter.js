const express = require('express');
const paymentRouter = express.Router();
const paymentController = require('../controllers/paymentController');
const verifyToken = require('../middlewares/verifyToken');
const ROUTES = require('../constants/routes');

paymentRouter.get(ROUTES.HOME, verifyToken, paymentController.authenticatePayment);
paymentRouter.post(ROUTES.HOME, verifyToken, paymentController.createPayment);

module.exports = paymentRouter;
