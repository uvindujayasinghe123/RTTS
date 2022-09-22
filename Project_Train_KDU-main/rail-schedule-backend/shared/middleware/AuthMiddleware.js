const createError = require("http-errors");
const JWT = require("jsonwebtoken");
module.exports = {
	AuthMiddleware: (req, res, next) => {
		if (!req.headers["authorization"])
			return next(createError.Unauthorized());
		const authHeader = req.headers["authorization"];
		const bearerToken = authHeader.split(" ");
		const token = bearerToken[1];
		JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
			if (err) {
				const message =
					err.name === "JsonWebTokenError"
						? "Unauthorized"
						: err.message;
				return next(createError.Unauthorized(message));
			}
			req.payload = payload;
			req.user = payload.aud;
			next();
		});
	},
	AccessControlMiddleware: (roles) => {
		return async (req, res, next) => {
			try {
                const permission = req.payload.roles.some((r) => roles.indexOf(r) >= 0);
                permission ? next() : next(createError.Unauthorized("Unauthorized"));
			} catch (err) {
                const message =
					err.name === "JsonWebTokenError"
						? "Unauthorized"
						: err.message;
				next(createError.Unauthorized(message));
			}
		};
	},
};
