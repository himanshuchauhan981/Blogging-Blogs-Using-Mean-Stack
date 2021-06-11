const { likeHandler } = require('../handlers');

const like = {
	saveOrDeletePostLike: async (req, res) => {
		const response = await likeHandler.saveOrDeletePostLike(req, res);
		return response;
	},
};

module.exports = like;
