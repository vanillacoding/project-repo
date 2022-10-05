import Joi from 'joi';

export const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  name: Joi.string()
    .required(),
  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])'))
    .required(),
  passwordConfirm: Joi.string()
    .min(8)
    .max(20)
    .valid(Joi.ref('password'))
    .required(),
  companyName: Joi.string()
    .required(),
  companyEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  companyRegistrationNumber: Joi.string()
    .pattern(new RegExp('([0-9]{3})-([0-9]{2})-([0-9]{5})'))
    .required(),
});
