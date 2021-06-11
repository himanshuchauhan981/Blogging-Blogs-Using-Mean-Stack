const { likeModel, postModel } = require('../models');

let likes = {
	saveOrDeletePostLike: async (req, res) => {
		let postId = req.params.postId;
		let userId = req.user._id;
		let existingLike = await likeModel.getById(postId, userId);
		if (existingLike === null) {
			await likeModel.save({
				postId: postId,
				userId: userId,
			});
			await postModel.increaseLikeCount(postId);
			res.status(200).send(true);
		} else {
			await likeModel.deleteById(postId, userId);
			await postModel.decreaseLikeCount(postId);
			res.status(200).send(false);
		}
	},
};

module.exports = likes;
