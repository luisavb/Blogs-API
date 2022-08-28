const Joi = require('joi');

const { Category, BlogPost } = require('../database/models');

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

const postVldFields = (req, res, next) => {
  if (!req.body) return res.status(400).json({ message: 'helooooow passa o body' });
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });
  next();
};

const postSchema2 = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const postVldFields2 = (req, res, next) => {
  if (!req.body) return res.status(400).json({ message: 'helooooow passa o body' });
  const { error } = postSchema2.validate(req.body);
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });
  next();
};

const postVldCategory = async (req, res, next) => {
  const { categoryIds } = req.body;
  const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });
  
  if (count < categoryIds.length) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

const canUserUpdate = async (req, res, next) => {
  const userAuthId = req.id;
  const postId = req.params.id;
  const postToBeUpdated = await BlogPost.findByPk(postId);
  console.log('tô em validations --', postToBeUpdated);
  if (!postToBeUpdated) return res.status(404).json({ message: 'Post does not exist' });
  if (postToBeUpdated.userId !== userAuthId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};

const validation = { 
  userValidation,
  loginValidation,
  postVldFields,
  postVldCategory,
  postVldFields2,
  canUserUpdate,
};
module.exports = validation;