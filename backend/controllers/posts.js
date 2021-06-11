const { postHandler } = require('../handlers');

const post = {
	createNewPost: async (req, res) => {
		const response = await postHandler.createNewPost(req, res);
		return response;
	},

	getAllPosts: async (req, res) => {
		const response = await postHandler.getAllPosts(req, res);
		return response;
	},

	getPostImage: async (req, res) => {
		const response = await postHandler.getPostImage(req, res);
		return response;
	},

	getParticularPost: async (req, res) => {
		const response = await postHandler.getParticularPost(req, res);
		return response;
	},

	getAllParticularUserPost: async (req, res) => {
		const response = await postHandler.getAllParticularUserPost(req, res);
		return response;
	},

	deleteParticularPost: async (req, res) => {
		const response = await postHandler.deleteParticularPost(req, res);
		return response;
	},

	editPost: async (req, res) => {
		const response = await postHandler.editPost(req, res);
		return response;
	},
	getTopPosts: async (req, res) => {
		const response = await postHandler.getTopPosts(req, res);
		return response;
	},
};

module.exports = post;
