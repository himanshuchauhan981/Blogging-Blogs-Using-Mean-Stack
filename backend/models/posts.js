const mongoose = require('mongoose')

const Schema = mongoose.Schema

const posts = new Schema({
    postTitle: {
        type: String,
        required: [true,'Post Title is required']
    },
    postContent: {
        type: String,
        required: [true,'Post Content is required']
    },
    postDate : {
        type: Date,
        default: Date.now
    },
    postAuthor:{
        type: String
    },
    userId: {
        type: String
    },
    postImage: {
        type: String
    }
})

module.exports = mongoose.model('posts',posts)