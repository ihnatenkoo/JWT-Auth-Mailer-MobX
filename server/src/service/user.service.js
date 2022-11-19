const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail.service');
const TokenService = require('./tokens.service');
const UserDto = require('../dto/user.dto');

class UserService {
	async register(email, password) {
		const candidate = await UserModel.findOne({ email });

		if (candidate) {
			throw new Error(`User with email ${email} already exist`);
		}

		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink = uuid.v4();

		const user = await UserModel.create({
			email,
			password: hashPassword,
			activationLink,
		});

		await MailService.sendActivationMail(email, activationLink);

		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });
		await TokenService.saveRefreshTokenToDb(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}
}

module.exports = new UserService();
