const Joi = require("joi");

exports.idParamsSchema = Joi.object({
  id: Joi.string().required(),
});

exports.recordBodySchema = Joi.object({
  score: Joi.number().required(),
  username: Joi.string().required(),
});
