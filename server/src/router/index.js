const Router = require('express');

const authRouter = new Router();

authRouter.post('/register', (req, res) => {
	res.send('ok');
});
authRouter.post('/login');
authRouter.post('/logout');
authRouter.get('/activate/:link');
authRouter.get('/refresh');
authRouter.get('/users');

module.exports = authRouter;
