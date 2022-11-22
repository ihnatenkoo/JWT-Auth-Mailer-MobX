const UserService = require('../service/user.service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
class UserController {
	async register(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()));
			}
			const { email, password } = req.body;
			const newUser = await UserService.register(email, password);
			res.cookie('refreshToken', newUser.refreshToken, {
				maxAge: ONE_MONTH,
				httpOnly: true,
			});
			return res.status(201).json(newUser);
		} catch (error) {
			next(error);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await UserService.login(email, password);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: ONE_MONTH,
				httpOnly: true,
			});
			res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async logout(req, res, next) {
		try {
		} catch (error) {
			next(error);
		}
	}
	async activate(req, res, next) {
		try {
			const activationLink = req.params.link;
			await UserService.activate(activationLink);
			return res.redirect(process.env.CLIENT_URL);
		} catch (error) {
			next(error);
		}
	}
	async refresh(req, res, next) {
		try {
		} catch (error) {
			next(error);
		}
	}
	async getUsers(req, res, next) {
		try {
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new UserController();
