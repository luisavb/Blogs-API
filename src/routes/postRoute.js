const { Router } = require('express');

const postController = require('../controllers/postController');
const validation = require('../middlewares/validations');
const authentication = require('../middlewares/auth');

const userRouter = Router();

userRouter.post('/',
  validation.postVldFields,
  validation.postVldCategory,
  authentication.auth,
  postController.postCreate);

userRouter.get('/', authentication.auth, postController.getAllPost);

userRouter.get('/:id', authentication.auth, postController.getByIdPost);

userRouter.put('/:id', 
  authentication.auth,
  validation.canUserModify,
  validation.postVldFields2,
  postController.updatePost);

userRouter.delete('/:id', 
  authentication.auth,
  validation.canUserModify,
  postController.deletePost);

module.exports = userRouter;