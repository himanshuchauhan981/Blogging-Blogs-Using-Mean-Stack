const mongoose = require('mongoose');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const { users, blogPosts, postLikes, comments } = require('../schemas');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const url = `mongodb://127.0.0.1:27017/blog`;

mongoose.connect(url, (err, conn) => {
	if (err) {
		console.log('Mongo error ', err);
	} else {
		console.log('Mongoose Connection is Successful');
	}
});

async function createUsersAndPostsMockData() {
	let totalUsers = 15;
	await users.remove();
	await blogPosts.remove();
	await postLikes.remove();
	await comments.remove();
	for (let i = 0; i < totalUsers; i++) {
		// Creating new users
		let firstName = faker.name.firstName();
		let lastName = faker.name.lastName();
		let username = faker.internet
			.userName()
			.toLocaleLowerCase()
			.replace('.', '');
		let email = `${firstName.toLocaleLowerCase()}${faker.random
			.number()
			.toString()
			.substr(0, 2)}@${faker.internet.domainWord()}.com`;
		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync('Sample@12', salt);
		let userObject = new users({
			firstName: firstName,
			lastName: lastName,
			username: username,
			email: email,
			password: hash,
		});
		savedUsers = await userObject.save();

		//Creating new blog posts per user
		let totalPosts = Math.floor(Math.random() * 10) + 1;
		let publishedAt = Math.floor(Math.random() * 30) + 1;
		for (j = 0; j < totalPosts; j++) {
			let postObject = new blogPosts({
				postTitle: faker.lorem.sentence().replace('.', ''),
				postContent: faker.lorem.paragraphs(4),
				postAuthor: `${firstName} ${lastName}`,
				userId: userObject._id,
				postImage: null,
				publishedAt: Date.now() + publishedAt * 86400000,
				publishStatus: 'submit',
				draftedAt: null,
			});
			await postObject.save();
		}
	}
	console.log('Users and blog posts data created');
	createLikeAndCommentMockData();
}

async function createLikeAndCommentMockData() {
	let allBlogPosts = await blogPosts.find();
	let allUsers = await users.find();
	for (i = 0; i < allBlogPosts.length; i++) {
		let totalLikes = Math.floor(Math.random() * allUsers.length) + 1;
		for (j = 0; j < totalLikes; j++) {
			let likeObject = new postLikes({
				postId: allBlogPosts[i]._id,
				userId: allUsers[j]._id,
			});
			await likeObject.save();
			await blogPosts.findByIdAndUpdate(allBlogPosts[i]._id, {
				$inc: { likeCount: 1 },
			});
		}
		totalComments = Math.floor(Math.random() * 10) + 1;
		for (j = 0; j < totalComments; j++) {
			commentWordsLength = Math.floor(Math.random() * 25) + 1;
			let commentObject = new comments({
				postId: allBlogPosts[i]._id,
				text: faker.lorem.words(commentWordsLength),
				createdBy: allUsers[j]._id,
			});
			await commentObject.save();
		}
	}
	console.log('Like and comment data created');
}

createUsersAndPostsMockData();
