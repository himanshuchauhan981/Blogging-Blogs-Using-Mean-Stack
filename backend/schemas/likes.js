const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likes = new Schema({
	postId: {
		type: String,
	},
	userId: {
		type: String,
	},
	likedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('likes', likes);
