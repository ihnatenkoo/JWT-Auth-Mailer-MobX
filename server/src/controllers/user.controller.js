const UserService = require('../service/user.service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
class UserController {
	async register(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors));
			}

			const { email, password } = req.body;
			const newUser = await UserService.register(email, password);
			res.cookie('refreshToken', newUser.refreshToken, {
				maxAge: ONE_MONTH,
				httpOnly: true,
				sameSite: 'none',
				secure: true,
			});
			return res.status(201).json(newUser);
		} catch (error) {
			next(error);
		}
	}

	async login(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors));
			}

			const { email, password } = req.body;
			const userData = await UserService.login(email, password);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: ONE_MONTH,
				httpOnly: true,
				sameSite: 'none',
				secure: true,
			});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await UserService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
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
			const { refreshToken } = req.cookies;
			const userData = await UserService.refresh(refreshToken);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: ONE_MONTH,
				httpOnly: true,
				sameSite: 'none',
				secure: true,
			});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await UserService.getAllUsers();
			return res.json(users);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new UserController();
