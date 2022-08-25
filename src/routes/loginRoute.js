const { Router } = require('express');

const loginController = require('../controllers/loginController');
const validation = require('../middlewares/validations');

const loginRouter = Router();

loginRouter.post('/', validation.loginValidation, loginController.login);

module.exports = loginRouter;