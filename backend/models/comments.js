const mongoose = require('mongoose')

const Schema = mongoose.Schema

const comments = new Schema({
    postId: {
        type: String
    },
    text: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String
    }
})

module.exports = mongoose.model('comments',comments)