const express = require('express');

const {
  getSignupValidationRules,
  getLoginValidationRules,
  validateUser
} = require('../middlewares/validator');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', getSignupValidationRules(), validateUser, authController.signup);

router.post('/login', getLoginValidationRules(), validateUser, authController.login);

router.delete('/', authController.deleteTestUser);

module.exports = router;
