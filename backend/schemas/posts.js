const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const posts = new Schema({
	postTitle: {
		type: String,
		required: [true, 'Post Title is required'],
	},
	postContent: {
		type: String,
		required: [true, 'Post Content is required'],
	},
	postAuthor: {
		type: String,
	},
	userId: {
		type: String,
	},
	postImage: {
		type: String,
	},
	lastModifiedAt: {
		type: Date,
		default: null,
	},
	likeCount: {
		type: Number,
		default: 0,
	},
	publishStatus: {
		type: String,
	},
	publishedAt: {
		type: Date,
	},
	draftedAt: {
		type: Date,
	},
});

module.exports = mongoose.model('posts', posts);
