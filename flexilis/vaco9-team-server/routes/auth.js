const express = require('express');
const authController = require('../controllers/auth.controller');
const {
  advertiserRegisterValidation,
  userRegisterValidation,
  loginValidation,
} = require('../middlewares/validateInput');

const router = express.Router();

router.post('/register/advertiser', advertiserRegisterValidation, authController.register);
router.post('/login/advertiser', loginValidation, authController.login);
router.post('/register/user', userRegisterValidation, authController.registerUser);
router.post('/login/user', loginValidation, authController.loginUser);

module.exports = router;
