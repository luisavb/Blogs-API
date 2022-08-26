const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });
  next();
};

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '"displayName" length must be at least 8 characters long',
    'any.empty': '"displayName" is missing',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
    'any.empty': '"email" is missing',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be at least 6 characters long',
    'any.empty': '"password" is missing',
  }),
  image: Joi.string().required(),
});

const userValidation = (req, res, next) => {
  if (!req.body) return res.status(400).json({ message: 'helooooow' });
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

const validation = { userValidation, loginValidation };
module.exports = validation;