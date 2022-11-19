const UserService = require('../service/user.service');

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
class UserController {
	async register(req, res) {
		try {
			const { email, password } = req.body;
			const newUser = await UserService.register(email, password);
			res.cookie('refreshToken', newUser.refreshToken, {
				maxAge: ONE_MONTH,
				httpOnly: true,
			});
			return res.status(201).json(newUser);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	async login(req, res) {
		try {
		} catch (error) {}
	}

	async logout(req, res) {
		try {
		} catch (error) {}
	}
	async activate(req, res) {
		try {
			const activationLink = req.params.link;
			await UserService.activate(activationLink);
			return res.redirect(process.env.CLIENT_URL);
		} catch (error) {
			console.log(error);
		}
	}
	async refresh(req, res) {
		try {
		} catch (error) {}
	}
	async getUsers(req, res) {
		try {
			res.json(['1', '2']);
		} catch (error) {}
	}
}

module.exports = new UserController();
