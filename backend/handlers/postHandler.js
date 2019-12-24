const { blogPosts } = require('../models')

const posts = {
    createNewPost: async(req,res) =>{
        const blogPostObject = new blogPosts({
            postTitle: req.body.postTitle,
            postContent: req.body.postContent,
            postImageId: typeof req.file === "undefined" || !req.file ? null : req.file.id,
            // postImageId: req.file ? null: req.file.id,
            postAuthor: req.body.postAuthor
        })
        await blogPostObject.save()
        res.status(200).send({"msg":"postSaved"})
    }
}

module.exports = {
    posts
}