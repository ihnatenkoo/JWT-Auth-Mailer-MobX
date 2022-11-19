const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token.model');

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, {
			expiresIn: '15m',
		});
		const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {
			expiresIn: '30d',
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	async saveToken(userId, refreshToken) {
		const tokenData = await TokenModel.findOne();

		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}

		const token = await TokenModel.create({ user: userId, refreshToken });

		return token;
	}
}

module.exports = new TokenService();
