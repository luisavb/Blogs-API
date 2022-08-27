const Joi = require('joi');

const { Category } = require('../database/models');

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

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const postValidation1 = (req, res, next) => {
  if (!req.body) return res.status(400).json({ message: 'helooooow passa o body' });
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });
  next();
};

const postValidation2 = async (req, res, next) => {
  const { categoryIds } = req.body;
  const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });
  console.log('tô em validations --', count);
  if (count < categoryIds.length) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

const validation = { userValidation, loginValidation, postValidation1, postValidation2 };
module.exports = validation;