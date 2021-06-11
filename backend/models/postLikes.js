const { postLikes } = require('../schemas');

class Like {
	constructor() {
		this.likeModel = postLikes;
	}

	getById = (postId, userId) => {
		return this.likeModel.findOne({
			postId: postId,
			userId: userId,
		});
	};

	deleteById = (postId, userId) => {
		return postLikes.findOneAndRemove({
			postId: postId,
			userId: userId,
		});
	};

	save = (data) => {
		const likeObject = new postLikes(data);
		return likeObject.save();
	};
}

module.exports = new Like();
