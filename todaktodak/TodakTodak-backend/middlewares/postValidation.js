const Joi = require("joi");
const createError = require("http-errors");

module.exports.validatePostInfo = (req, res, next) => {
  const schema = Joi.object({
    postType: Joi.string().required(),
    category: Joi.string().required(),
    postTitle: Joi.string().required(),
    anonymousType: Joi.string().required(),
    worryContents: Joi.string().required()
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
    next();
  }
};
