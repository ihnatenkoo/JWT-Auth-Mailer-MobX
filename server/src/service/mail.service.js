const nodemailer = require('nodemailer');

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			port: process.env.SMTP_PORT,
			host: process.env.SMTP_HOST,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
	}

	async sendActivationMail(to, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: `Activation account on ${process.env.API_URL}`,
			text: '',
			html: `
					<div>
						<h1>For activation click the link below</h1>
						<a href=${link}>${link}</a>
					<div>
			`,
		});
	}
}

module.exports = new MailService();
