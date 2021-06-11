const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const users = new Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required'],
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
	},
	username: {
		type: String,
		minlength: [5, 'Minimum username length should be 5 characters'],
		required: [true, 'Username is required'],
		validate: {
			validator: (v) => {
				return /^(?![0-9_])\w+$/.test(v);
			},
			message: 'Username can contain only alphabhets and numbers',
		},
	},
	email: {
		type: String,
		required: [true, 'Email ID is required'],
		validate: {
			validator: (email) => {
				return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
			},
			message: 'Invalid Email ID',
		},
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [6, 'Minimum length of password should be 6'],
		validate: {
			validator: (password) => {
				return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/.test(
					password
				);
			},
			message:
				'Must contain one upper letter, one lower letter and one non-alpha character',
		},
	},
	profileImage: {
		type: String,
		default: null,
	},
	lastLogin: {
		type: Date,
	},
});

module.exports = mongoose.model('users', users);
