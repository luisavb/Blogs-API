const { Router } = require('express');

const categoryController = require('../controllers/categoryController');
const authentication = require('../middlewares/auth');

const userRouter = Router();

userRouter.post('/', authentication.auth, categoryController.categoryCreate);
userRouter.get('/', authentication.auth, categoryController.getAll);

module.exports = userRouter;