const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const followers = new Schema({
	followedBy: {
		type: String,
		required: [true, 'Unexpected Error'],
	},
	followedTo: {
		type: String,
		required: [true, 'Unexpected Error'],
	},
	followedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('followers', followers);
