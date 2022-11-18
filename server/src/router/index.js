const Router = require('express');
const UserController = require('../controllers/user.controller');

const authRouter = new Router();

authRouter.post('/register', UserController.register);
authRouter.post('/login', UserController.login);
authRouter.post('/logout', UserController.logout);
authRouter.get('/activate/:link', UserController.activate);
authRouter.get('/refresh', UserController.refresh);
authRouter.get('/users', UserController.getUsers);

module.exports = authRouter;
