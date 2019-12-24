const { blogPosts } = require('../models')

const posts = {
    createNewPost: async(req,res) =>{
        const blogPostObject = new blogPosts({
            postTitle: req.body.postTitle,
            postContent: req.body.postContent,
            postImageId: req.file.id,
            postAuthor: req.body.postAuthor
        })
        await blogPostObject.save()
        res.status(200).send({"msg":"postSaved"})
    }
}

module.exports = {
    posts
}