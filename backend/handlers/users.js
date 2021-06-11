const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const { createToken } = require('../auth').token;
const { users } = require('../schemas');
const { userModel } = require('../models');

const user = {
	saveUserDetails: async (req, res) => {
		let userDetails = req.body;
		let userStatus = await users.findOne({
			$or: [{ email: userDetails.email }, { username: userDetails.username }],
		});
		if (userStatus == null) {
			let salt = bcrypt.genSaltSync(10);
			let hash = bcrypt.hashSync(req.body.password, salt);
			req.body.password = hash;

			let user = new users(req.body);

			await user.save((err, user) => {
				if (err) {
					let error = Object.values(err.errors)[0].message;
					res.status(400).send(error);
				} else {
					res.status(200).send({ data: user._id });
				}
			});
		} else {
			res.status(400).send('User already existed');
		}
	},

	authenticateLoginUser: async (req, res, next) => {
		passport.authenticate('local', (err, user, info) => {
			if (err) return next(err);
			if (!user) return res.status(401).send('Invalid Credentials');
			req.logIn(user, async (err) => {
				if (err) {
					return next(err);
				}
				let token = createToken(user._id);
				await userModel.updateLastLogin(user._id);
				return res.status(200).json({ token: token });
			});
		})(req, res, next);
	},

	verifyJWTToken: async (req, res, next) => {
		passport.authenticate('jwt', (err, user, info) => {
			if (err) return next(err);
			if (!user) {
				return res.status(401).json({ error: 'Unauthorized User' });
			}
			return res.status(200).json({ user: user });
		})(req, res, next);
	},

	getFirstNameAndLastName: async (username) => {
		let data = await users
			.findOne({ username: username })
			.select({ firstName: 1, lastName: 1 });
		return data;
	},

	saveProfilePic: async (req, res) => {
		let id = mongoose.Types.ObjectId(req.body.userId);

		await users.findOneAndUpdate(
			{ _id: id },
			{ profileImage: req.file.filename }
		);
		res.status(200).json({ msg: 'Image saved' });
	},

	getUserImage: async (req, res) => {
		let data = await users.findById(req.params.id).select({ profileImage: 1 });
		let image = {
			filename: data.profileImage,
		};
		if (data.profileImage === null)
			image.filename = 'f4cf63567d7652cd466c1a67172efeed.png';

		let gfs = Grid(mongoose.connection.db, mongoose.mongo);
		gfs.collection('photos');
		gfs.files.findOne(image, (err, file) => {
			if (!err) {
				try {
					const readstream = gfs.createReadStream(file.filename);
					readstream.pipe(res);
				} catch (e) {
					console.log(e);
				}
			}
		});
	},
};

module.exports = user;
