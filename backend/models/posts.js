const { blogPosts } = require('../schemas');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class Post {
	constructor() {
		this.postModel = blogPosts;
	}

	increaseLikeCount = (postId) => {
		return this.postModel.findByIdAndUpdate(postId, {
			$inc: {
				likeCount: 1,
			},
		});
	};

	decreaseLikeCount = (postId) => {
		return this.postModel.findByIdAndUpdate(postId, {
			$inc: {
				likeCount: -1,
			},
		});
	};

	update = (postId, data) => {
		return this.postModel.findByIdAndUpdate(postId, data);
	};

	delete = (id) => {
		return this.postModel.findByIdAndRemove(id);
	};

	findById = (postId) => {
		return this.postModel.findById(postId);
	};

	findByUsername = (userId, pageIndex, pageSize) => {
		return this.postModel
			.find({
				userId: userId,
			})
			.skip(pageIndex)
			.limit(pageSize)
			.sort({ publishedAt: 1 });
	};

	create = (data) => {
		const blogPostObject = new this.postModel(data);
		return blogPostObject.save();
	};

	viewPost = (postId, userId) => {
		return this.postModel.aggregate([
			{
				$match: {
					$and: [{ _id: ObjectId(postId) }, { publishStatus: 'submit' }],
				},
			},
			{
				$project: {
					postTitle: 1,
					postContent: 1,
					publishedAt: 1,
					postAuthor: 1,
					postImage: 1,
					userId: 1,
				},
			},
			{
				$lookup: {
					from: 'likes',
					pipeline: [
						{ $match: { postId: postId } },
						{ $project: { postId: 0, likedAt: 0, userId: 0 } },
					],
					as: 'likes',
				},
			},
			{
				$lookup: {
					from: 'comments',
					pipeline: [
						{ $match: { postId: postId } },
						{ $project: { text: 1, createdAt: 1 } },
					],
					as: 'comments',
				},
			},
			{
				$lookup: {
					from: 'users',
					pipeline: [
						{ $match: { _id: ObjectId(userId) } },
						{ $project: { profileImage: 1, username: 1 } },
					],
					as: 'user',
				},
			},
		]);
	};

	find = (pageIndex, pageSize) => {
		return this.postModel
			.aggregate([
				{
					$match: {
						publishStatus: 'submit',
					},
				},
				{
					$project: {
						_id: {
							$toString: '$_id',
						},
						postContent: 1,
						postTitle: 1,
						publishedAt: 1,
						postAuthor: 1,
						postImage: 1,
						userId: 1,
					},
				},
				{
					$lookup: {
						from: 'comments',
						localField: '_id',
						foreignField: 'postId',
						as: 'comments',
					},
				},
				{
					$project: {
						'comments._id': 1,
						publishedAt: 1,
						postAuthor: 1,
						postImage: 1,
						userId: 1,
						postTitle: 1,
						postContent: 1,
					},
				},
			])
			.sort({ publishedAt: 1 })
			.skip(pageIndex)
			.limit(pageSize);
	};

	topPosts = () => {
		return this.postModel
			.aggregate([
				{
					$lookup: {
						from: 'users',
						let: { userObjId: { $toObjectId: '$userId' } },
						pipeline: [
							{
								$match: {
									$expr: {
										$eq: ['$_id', '$$userObjId'],
									},
								},
							},
						],
						as: 'users',
					},
				},
				{
					$project: {
						postTitle: 1,
						postAuthor: 1,
						userId: 1,
						'users.profileImage': 1,
						publishedAt: 1,
					},
				},
			])
			.sort({ likeCount: -1 })
			.limit(3);
	};
}

module.exports = new Post();
