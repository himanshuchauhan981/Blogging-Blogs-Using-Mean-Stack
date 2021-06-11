const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const url = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

const storage = new GridFsStorage({
	url: url,
	file: async (req, file) => {
		const buf = crypto.randomBytes(16);
		if (
			file.mimetype === 'image/jpeg' ||
			file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/png'
		) {
			const filename = buf.toString('hex') + path.extname(file.originalname);
			return {
				filename: filename,
				bucketName: 'photos',
			};
		}
	},
});

const upload = multer({ storage });

module.exports = {
	upload,
};
