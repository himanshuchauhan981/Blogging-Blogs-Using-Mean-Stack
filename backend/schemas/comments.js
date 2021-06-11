const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const comments = new Schema({
	postId: {
		type: String,
		required: [true, 'Unexpected Error'],
	},
	text: {
		type: String,
		required: [true, 'Unexpected Error'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	createdBy: {
		type: String,
		required: [true, 'Unexpected Error'],
	},
});

module.exports = mongoose.model('comments', comments);
