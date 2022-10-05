const { body, validationResult } = require('express-validator');

const validationMessages = {
  USERNAME: 'Username should be less than 8 characters.',
  EMAIL: 'Invalid email address.',
  PASSWORD: 'Password should be longer than 6 characters.',
  PASSWORD_CONFIRMATION: 'Password does not match.'
};

const getSignupValidationRules = () => [
  body('username', validationMessages.USERNAME).exists().isLength({ max: 8 }),
  body('email', validationMessages.EMAIL).exists().isEmail(),
  body('password', validationMessages.PASSWORD).exists().isLength({ min: 6 }),
  body('confirmationPassword', validationMessages.PASSWORD_CONFIRMATION)
    .exists()
    .custom((confirmationPassword, { req }) => confirmationPassword === req.body.password)
];

const getLoginValidationRules = () => [
  body('email', validationMessages.EMAIL).exists().isEmail(),
  body('password', validationMessages.PASSWORD).exists().isLength({ min: 6 })
];

const validateUser = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorMessages = errors.array().map(err => err.msg);

  res.status(400).json({
    errorMessage: errorMessages[0]
  });
};

module.exports = {
  getSignupValidationRules,
  getLoginValidationRules,
  validateUser
};
