const Joi = require("joi");

function validateName(name) {
  const nameSchema = Joi.string()
    .alphanum()
    .required();
  const result = nameSchema.validate(name);

  return result;
}

async function validateAsyncEmail(email) {
  const emailSchema = Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required();
  const result = await emailSchema.validateAsync(email);

  return result;
}

exports.validateName = validateName;
exports.validateAsyncEmail = validateAsyncEmail;
