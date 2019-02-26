const mongoose = require('mongoose')
mongoose.connect('mongodb://blogging_blogs:bloggingAdmin0018@ds161024.mlab.com:61024/blogging_blogs',{ useNewUrlParser: true })

const postSchema = mongoose.Schema({
   postTitle : String,
   postContent : String,
   postDate : String,
   postAuthor : String
})

module.exports = mongoose.model('posts',postSchema)
const Post = mongoose.model('posts',postSchema)
module.exports.Posts = Post;

module.exports.saveNewPosts = function(postData,callback){
   postData.save(postData,callback)
}

module.exports.getAllPostData = (callback) =>{
   Post.find(callback)
}
