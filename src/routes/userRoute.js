const { Router } = require('express');

const userController = require('../controllers/userController');
const validation = require('../middlewares/validations');
const authentication = require('../middlewares/auth');

const userRouter = Router();

userRouter.post('/', validation.userValidation, userController.userCreate);
userRouter.get('/:id', authentication.auth, userController.getById);
userRouter.get('/', authentication.auth, userController.getAll);

module.exports = userRouter;