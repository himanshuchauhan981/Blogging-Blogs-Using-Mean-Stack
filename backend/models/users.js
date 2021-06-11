const { users } = require('../schemas');

class Users {
	constructor() {
		this.userModel = users;
	}

	findByUsername = (username) => {
		return this.userModel.findOne({ username: username });
	};

	findByEmail = (email) => {
		return this.userModel.find({ email: email });
	};

	update = (username, email) => {
		return this.userModel.findOneAndUpdate({ username: username }, email, {
			new: true,
		});
	};

	updatePassword = (username, hashedPassword) => {
		return this.userModel.findOneAndUpdate(username, hashedPassword);
	};

	findById = (id) => {
		return this.userModel.findById(id);
	};

	find = () => {
		return this.userModel.aggregate([
			{
				$project: {
					fullName: {
						$concat: ['$firstName', ' ', '$lastName'],
					},
				},
			},
		]);
	};

	updateLastLogin = (id) => {
		return this.userModel.findByIdAndUpdate(id, {
			lastLogin: Date.now(),
		});
	};
}

module.exports = new Users();
