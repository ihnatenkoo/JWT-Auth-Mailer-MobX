const Router = require('express');
const UserController = require('../controllers/user.controller');
const { body } = require('express-validator');

const authRouter = new Router();

authRouter.post(
	'/register',
	body('email').isEmail(),
	body('password').isLength({ min: 3, max: 32 }),
	UserController.register
);
authRouter.post('/login', UserController.login);
authRouter.post('/logout', UserController.logout);
authRouter.get('/activate/:link', UserController.activate);
authRouter.get('/refresh', UserController.refresh);
authRouter.get('/users', UserController.getUsers);

module.exports = authRouter;
