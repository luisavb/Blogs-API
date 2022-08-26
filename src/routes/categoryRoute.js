const { Router } = require('express');

const categoryController = require('../controllers/categoryController');
// const validation = require('../middlewares/validations');
const authentication = require('../middlewares/auth');

const userRouter = Router();

userRouter.post('/', authentication.auth, categoryController.categoryCreate);
// userRouter.get('/:id', authentication.auth, userController.getById);
// userRouter.get('/', authentication.auth, userController.getAll);

module.exports = userRouter;