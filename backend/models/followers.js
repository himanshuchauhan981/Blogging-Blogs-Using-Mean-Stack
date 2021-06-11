const { followers } = require('../schemas');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class Followers {
	constructor() {
		this.followersModel = followers;
	}

	post(data) {
		let followerObject = new this.followersModel(data);
		return followerObject.save();
	}

	find(followedTo, followedBy) {
		return this.followersModel.findOne({
			followedTo: followedTo,
			followedBy: followedBy,
		});
	}

	delete(followedTo, followedBy) {
		return this.followersModel.findOneAndDelete({
			followedBy: followedBy,
			followedTo: followedTo,
		});
	}

	findByFollowedTo(username) {
		return this.followersModel.find({ followedTo: username });
	}

	findByFollowedBy(username) {
		return this.followersModel.aggregate([
			{
				$project: { followedBy: username, followedTo: 1 },
			},
			{
				$lookup: {
					from: 'users',
					let: { userObjId: { $toObjectId: '$followedTo' } },
					pipeline: [
						{
							$match: {
								$expr: {
									$eq: ['$_id', '$$userObjId'],
								},
							},
						},
					],
					as: 'user',
				},
			},
			{
				$unwind: '$user',
			},
			{
				$project: {
					'user.profileImage': 1,
					fullName: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
				},
			},
		]);
	}
}
module.exports = new Followers();
