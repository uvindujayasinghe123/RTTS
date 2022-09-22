const util = require("util");
const multer = require("multer");
const maxSize = 10 * 1024 * 1024;

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, `./${req._parsedUrl.path}`);
	},
	filename: (req, file, cb) => {
		const datetimestamp = Date.now();
		cb(
			null,
			datetimestamp +
				"." +
				file.originalname.split(".")[
					file.originalname.split(".").length - 1
				]
		);
	},
});

const uploadFile = multer({
	storage: storage,
	limits: { fileSize: maxSize },
}).any("files");

const uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
