const Joi = require("joi");
const createError = require("http-errors");

module.exports.validateSignupInfo = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    nickname: Joi.string().required()
  });

  validateRequest(req, next, schema);
};

const validateRequest = (req, next, schema) => {
  const options = {
    allowUnknown: true,
    stripUnknown: true
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    console.error(error.message);

    next(createError(400, error.message));
  } else {
    req.body = value;
    next();
  }
};
