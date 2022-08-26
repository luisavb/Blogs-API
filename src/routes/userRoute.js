const { Router } = require('express');

const userController = require('../controllers/userController');
const validation = require('../middlewares/validations');

const userRouter = Router();

userRouter.post('/', validation.userValidation, userController.userCreate);

module.exports = userRouter;