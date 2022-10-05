const Joi = require('joi');
const bodySchema = Joi.object({
  name: Joi.required(),
  episodeId: Joi.required(),
  host: Joi.required(),
});

const { ExistingBlankError } = require('../../lib/errors');

function validateBody(req, _, next) {
  const { error } = bodySchema.validate(req.body);

  if (error) {
    return next(new ExistingBlankError());
  }

  next();
}

module.exports = validateBody;
