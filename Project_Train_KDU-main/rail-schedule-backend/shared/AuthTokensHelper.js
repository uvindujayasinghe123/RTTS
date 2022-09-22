const createError = require("http-errors");
const JWT = require("jsonwebtoken");

module.exports = {
	createEmailVerificationToken: (email) => {
		return new Promise((resolve, reject) => {
			const secret = process.env.EMAIL_VERIFICATION_TOKEN_SECRET;
			const options = {
				expiresIn: process.env.EMAIL_VERIFICATION_TOKEN_EXP,
				audience: email,
			};
			JWT.sign({}, secret, options, (err, token) => {
				if (err) {
					console.error(err.message);
					reject(createError.InternalServerError());
					return;
				}
				resolve(token);
			});
		});
	},
	createPasswordResetToken: (email) => {
		return new Promise((resolve, reject) => {
			const secret = process.env.PASSWORD_RESET_TOKEN_SECRET;
			const options = {
				expiresIn: process.env.PASSWORD_RESET_TOKEN_EXP,
				audience: email,
			};
			JWT.sign({}, secret, options, (err, token) => {
				if (err) {
					console.error(err.message);
					reject(createError.InternalServerError());
					return;
				}
				resolve(token);
			});
		});
	},
};
