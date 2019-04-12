const mongoose = require('mongoose')
mongoose.connect('mongodb://blogging_blogs:bloggingAdmin0018@ds161024.mlab.com:61024/blogging_blogs',{ useNewUrlParser: true })

const postSchema = mongoose.Schema({
   postTitle : String,
   postContent : String,
   postDate : String,
   postAuthor : String,
   postImage:String,
   postComment: []
})

module.exports = mongoose.model('posts',postSchema)
const Post = mongoose.model('posts',postSchema)
module.exports.Posts = Post;

module.exports.saveNewPosts = (postData,callback) =>{
   postData.save(postData,callback)
}

module.exports.getAllPostData = (callback) =>{
   Post.find(callback)
}

module.exports.ifPostExisted = (checkPostTitle, checkPostContent, callback) =>{
   query = {postTitle:checkPostTitle}
   Post.findOne(query,callback)
}

module.exports.getPostData = (title,callback) =>{
   query = {postTitle:title}
   Post.findOne(query,callback)
}

module.exports.deleteSelectedPost = (title,callback) =>{
   query = {postTitle:title}
   Post.deleteOne(query,callback)
}

module.exports.updatePostData = (title,newPostTitle,newPostContent,callback) =>{
   Post.updateOne({postTitle:title}, {$set:{'postTitle':newPostTitle, 'postContent':newPostContent}}, callback)
}

module.exports.savePostComments = (commentObject, title, callback)=>{
    query = {postTitle:title.postTitle}

    Post.findOne(query,(err,docs)=>{
        copyDocs = docs.postComment
        copyDocs.push({postCommentName: commentObject.postCommentName, postCommentContent: commentObject.postCommentContent})
        Post.updateOne(query,{$set:{'postComment':copyDocs}}, callback)
    })
}
