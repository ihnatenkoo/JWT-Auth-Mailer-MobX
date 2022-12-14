const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail.service');
const TokenService = require('./tokens.service');
const UserDto = require('../dto/user.dto');
const ApiError = require('../exceptions/api-error');

class UserService {
	async register(email, password) {
		const candidate = await UserModel.findOne({ email });

		if (candidate) {
			throw ApiError.BadRequest(`User with email ${email} already exist`);
		}

		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink = uuid.v4();

		const user = await UserModel.create({
			email,
			password: hashPassword,
			activationLink,
		});

		await MailService.sendActivationMail(
			email,
			`${process.env.API_URL}/auth/activate/${activationLink}`
		);

		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });
		await TokenService.saveRefreshTokenToDb(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email });

		if (!user) {
			throw ApiError.BadRequest(`User with email ${email} not found`);
		}

		const isCorrectPass = await bcrypt.compare(password, user.password);

		if (!isCorrectPass) {
			throw ApiError.BadRequest(`Wrong password`);
		}

		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });
		await TokenService.saveRefreshTokenToDb(user._id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	async logout(refreshToken) {
		const token = await TokenService.removeToken(refreshToken);
		return token;
	}

	async activate(activateLink) {
		const user = await UserModel.findOne({ activateLink });
		if (!user) {
			throw ApiError.BadRequest('Incorrect activation link');
		}
		user.isActivated = true;
		await user.save();
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}

		const userData = TokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await TokenService.findToken(refreshToken);

		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}

		const user = await UserModel.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });
		await TokenService.saveRefreshTokenToDb(user._id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	async getAllUsers() {
		const users = await UserModel.find();
		return users;
	}
}

module.exports = new UserService();
