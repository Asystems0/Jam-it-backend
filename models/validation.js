//VALIDATION
const Joi = require("joi");

const registerValidtaion = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(32).required().messages({
      "string.empty": `name cannot be an empty field`,
      "string.min": `name should have a minimum length of 6 characters`,
      "string.max": `name should have a maximum length of 32 characters`,
      "any.required": `name is a required field`,
    }),
    email: Joi.string().min(6).max(32).required().email().messages({
      "string.empty": `email cannot be an empty field`,
      "string.min": `email should have a minimum length of 6 characters`,
      "string.max": `email should have a maximum length of 32 characters`,
      "any.required": `email is a required field`,
    }),
    password: Joi.string().min(8).max(128).required().messages({
      "string.empty": `password cannot be an empty field`,
      "string.min": `password should have a minimum length of 8 characters`,
      "string.max": `password should have a maximum length of 128 characters`,
      "any.required": `password is a required field`,
    }),
  });

  return schema.validate(data);
};

const loginValidtaion = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(32).required().email(),
    password: Joi.string().min(8).max(128).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidtaion = registerValidtaion;
module.exports.loginValidtaion = loginValidtaion;
