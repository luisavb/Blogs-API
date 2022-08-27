const { Router } = require('express');

const postController = require('../controllers/postController');
const validation = require('../middlewares/validations');
const authentication = require('../middlewares/auth');

const userRouter = Router();

userRouter.post('/',
  validation.postValidation1,
  validation.postValidation2,
  authentication.auth,
  postController.postCreate);

module.exports = userRouter;