const userService = require('../service/user.service');

class UserController {
	async register(req, res, next) {
		try {
			const { email, password } = req.body;
			const newUser = await userService.register(email, password);
			res.status(201).json(newUser);
		} catch (error) {
			console.log(error);
			res.status(400).json(error.message);
		}
	}

	async login(req, res, next) {
		try {
		} catch (error) {}
	}

	async logout(req, res, next) {
		try {
		} catch (error) {}
	}
	async activate(req, res, next) {
		try {
		} catch (error) {}
	}
	async refresh(req, res, next) {
		try {
		} catch (error) {}
	}
	async getUsers(req, res, next) {
		try {
			res.json(['1', '2']);
		} catch (error) {}
	}
}

module.exports = new UserController();
