const Joi = require("joi");

// Validation schema for user registration
exports.registerSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string(),
  phone_number: Joi.string(),
});

exports.createUser = {
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string(),
  phone_number: Joi.string(),
};

// Validation schema for user login
exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Validation schema for updating user details
exports.updateUser = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  role: Joi.string(),
  phone_number: Joi.string(),
});
