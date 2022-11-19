const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

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

		return user;
	}
}

module.exports = new UserService();
