const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const { likeModel, postModel, userModel } = require('../models');
const { getFirstNameAndLastName } = require('./users');

async function capitalizeUsername(username) {
	let userData = await getFirstNameAndLastName(username);
	userData.firstName =
		userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1);
	userData.lastName =
		userData.lastName.charAt(0).toUpperCase() + userData.lastName.slice(1);
	return userData;
}

async function editPostWithoutImageUpdate(req) {
	await postModel.update(req.params.postId, {
		postTitle: req.body.postTitle,
		postContent: req.body.postContent,
		lastModifiedAt: Date.now(),
	});
}

async function editPostWithImageUpdate(req) {
	await postModel.update(req.params.postId, {
		postTitle: req.body.postTitle,
		postContent: req.body.postContent,
		postImage: req.file.filename,
		lastModifiedAt: Date.now(),
	});
}

async function showEditPost(id) {
	let post = await postModel
		.findById(id)
		.select({ postTitle: 1, postContent: 1, postImage: 1 });
	return post;
}

async function calculateComments(blogs) {
	for (i = 0; i < blogs.length; i++) {
		let len = blogs[i].comments.length;
		blogs[i].comments = len;
	}
	return blogs;
}

async function viewPost(postId, userId) {
	let likeStatus = false;

	let postData = await postModel.viewPost(postId, userId);

	likeCount = postData[0]['likes'].length;
	commentCount = postData[0]['comments'].length;

	let likeData = await likeModel.getById(postId, userId);

	if (likeData != null) likeStatus = true;

	let data = {
		post: postData[0],
		commentCount: commentCount,
		likeCount: likeCount,
		likeStatus: likeStatus,
	};
	return data;
}

const posts = {
	createNewPost: async (req, res) => {
		let userData = await capitalizeUsername(req.user.username);
		let publishStatus = req.body.publishStatus;
		postModel
			.create({
				postTitle: req.body.postTitle,
				postContent: req.body.postContent,
				postImage:
					typeof req.file === 'undefined' || !req.file
						? null
						: req.file.filename,
				postAuthor: userData.firstName + ' ' + userData.lastName,
				userId: req.user._id,
				publishStatus: publishStatus,
				publishedAt: publishStatus == 'submit' ? Date.now() : null,
				draftedAt: publishStatus == 'draft' ? Date.now() : null,
			})
			.then((post) => {
				res.status(200).json('New post created');
			})
			.catch((err) => {
				res.status(400).json('Something wrong happened, Try again!!!');
			});
	},

	getAllPosts: async (req, res) => {
		let pageIndex = parseInt(req.query.pageIndex);
		let pageSize = parseInt(req.query.pageSize);

		pageIndex = pageIndex * pageSize;

		let allBlogs = await postModel.find(pageIndex, pageSize);
		allBlogs = await calculateComments(allBlogs);

		res.status(200).json({ blogs: allBlogs });
	},

	getTopPosts: async (req, res) => {
		let topBlogs = await postModel.topPosts();

		res.status(200).json({ topBlogs: topBlogs });
	},

	getPostImage: async (req, res) => {
		let image = {
			filename: req.params.id,
		};

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

	getParticularPost: async (req, res) => {
		let post;
		let editStatus = req.query.edit;
		let postId = req.params.id;
		let userId = req.user._id;
		if (editStatus === 'true') {
			post = await showEditPost(postId);
		} else {
			post = await viewPost(postId, userId);
		}
		res.status(200).send(post);
	},

	getAllParticularUserPost: async (req, res) => {
		let authenticated = false;
		let pageIndex = parseInt(req.query.pageIndex);
		let pageSize = parseInt(req.query.pageSize);
		pageIndex = pageIndex * pageSize;
		if (req.user.username === req.params.username) {
			authenticated = true;
		}
		let userDetails = await userModel
			.findByUsername(req.params.username)
			.select({ _id: 1, profileImage: 1, username: 1 });
		let userPosts = await postModel
			.findByUsername(userDetails._id, pageIndex, pageSize)
			.select({
				draftedAt: 0,
				lastModifiedAt: 0,
				likeCount: 0,
				publishStatus: 0,
			});

		res.status(200).json({ userPosts, authenticated, userDetails });
	},

	deleteParticularPost: async (req, res) => {
		let id = req.params.id;
		let userPost = await postModel.findById(id);
		if (userPost) {
			let authorizedUser =
				req.user._id.toString() === userPost.userId.toString();
			if (authorizedUser) {
				let data = await postModel.delete(id);
				let gfs = Grid(mongoose.connection.db, mongoose.mongo);
				let postImageData = await gfs
					.collection('photos')
					.findOneAndDelete({ filename: data['postImage'] });
				res.status(200).json({ msg: 'Post deleted' });
			} else res.status(404).json('Something wrong happened, Try again');
		} else res.status(404).json('Post not found');
	},

	editPost: async (req, res) => {
		if (req.params.username === req.user.username) {
			if (req.file === undefined) await editPostWithoutImageUpdate(req);
			else await editPostWithImageUpdate(req);
			res.status(200).json('Post edited');
		} else res.status(400).json('Post not edited. Try again');
	},
};

module.exports = posts;
