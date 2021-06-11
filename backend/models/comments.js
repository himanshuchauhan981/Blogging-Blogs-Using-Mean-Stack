const { comments } = require('../schemas');

class Comments {
	constructor() {
		this.commentsModel = comments;
	}

	delete = (id) => {
		return this.commentsModel.findByIdAndDelete(id);
	};

	findByPostId = (postId) => {
		return this.commentsModel.find({ postId: postId });
	};

	save = (data) => {
		let commentObject = new this.commentsModel(data);
		return commentObject.save();
	};

	find = (postId, index, size) => {
		return this.commentsModel
			.aggregate([
				{ $match: { postId: postId } },
				{ $project: { createdBy: 1, text: 1 } },
				{
					$lookup: {
						let: { userObjId: { $toObjectId: '$createdBy' } },
						from: 'users',
						pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$userObjId'] } } }],
						as: 'user',
					},
				},
				{ $unwind: '$user' },
				{
					$project: {
						'user.firstName': 1,
						'user.lastName': 1,
						'user.profileImage': 1,
						text: 1,
					},
				},
			])
			.skip(index)
			.limit(size);
	};
}
module.exports = new Comments();
