const { commentHandler } = require('../handlers');

const comment = {
	getParticularPostComments: async (req, res) => {
		const response = await commentHandler.getParticularPostComments(req, res);
		return response;
	},

	saveNewPostComment: async (req, res) => {
		const response = await commentHandler.saveNewPostComment(req, res);
		return response;
	},

	deletePostComment: async (req, res) => {
		const response = await commentHandler.deletePostComment(req, res);
		return response;
	},
};

module.exports = comment;
