const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });
  next();
};

const validation = { loginValidation };
module.exports = validation;