const Joi = require("joi");
/**
 * validate inputs by joi schema
 * @param {object} data - object
 * @returns {[object|object]} [error, value] if data doesn't match to schem error has value
 */
const validateReview = (data) => {
  const schema = Joi.object()
    .keys({
      beerId: Joi.string(),
      review: Joi.object()
        .keys({
          rating: Joi.number().min(0).max(5).required(),
          body: Joi.number().min(0).max(10).required(),
          aroma: Joi.number().min(0).max(10).required(),
          sparkling: Joi.number().min(0).max(10).required(),
        })
        .and("rating", "body", "aroma", "sparkling")
        .length(4),
      comment: Joi.string().allow("").max(20).required(),
    })
    .and("beerId", "review", "comment")
    .length(3);

  return schema.validate(data);
};

const validateQuery = (query) => {
  const schema = Joi.object().keys({
    text: Joi.string().allow("").trim().max(50).truncate(),
    limit: Joi.string().allow("").trim().max(50).truncate(),
  });

  return schema.validate(query);
};

const validateToken = (token) => {
  const schema = Joi.string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required();
  return schema.validate(token);
};

const validateBase64 = (base64) => {
  const schema = Joi.string().base64().required();
  return schema.validate(base64);
};

module.exports = {
  validateReview,
  validateQuery,
  validateToken,
  validateBase64,
};
