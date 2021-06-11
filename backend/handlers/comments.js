const { commentModel } = require('../models');

const comment = {
	getParticularPostComments: async (req, res) => {
		let postId = req.query.postId;
		let index = parseInt(req.query.index);
		let size = parseInt(req.query.size);
		let lastDocument = false;
		index = index * size;
		let commentLength = await commentModel.findByPostId(postId).length;
		if (index + size >= commentLength) {
			lastDocument = true;
		}
		let commentData = await commentModel.find(postId, index, size);
		res
			.status(200)
			.send({ commentData: commentData, lastDocument: lastDocument });
	},

	saveNewPostComment: async (req, res) => {
		let arr = [];
		req.body.createdBy = req.user._id;
		await commentModel.save(req.body, async (err, comment) => {
			if (err) {
				let error = Object.values(err.errors)[0].message;
				res.status(200).json({ status: 400, msg: error });
			} else {
				arr.push(comment);
				let commentData = await commentModel.findByPostId(req.body.postId);
				res.status(200).json({ data: arr, length: commentData.length });
			}
		});
	},

	deletePostComment: async (req, res) => {
		const deleteCommentStatus = await commentModel.delete(req.params.id);
		res
			.status(200)
			.json({ status: 200, msg: 'message deleted', data: deleteCommentStatus });
	},
};

module.exports = comment;
