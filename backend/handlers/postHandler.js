const { blogPosts } = require('../models')

const posts = {
    createNewPost: async(req,res) =>{
        const blogPostObject = new blogPosts({
            postTitle: req.body.postTitle,
            postContent: req.body.postContent,
            postImageId: typeof req.file === "undefined" || !req.file ? null : req.file.id,
            postAuthor: req.body.postAuthor
        })
        await blogPostObject.save()
        res.status(200).json({ msg:"New post created",status:200 })
    },
    
    getAllPosts : async(req,res)=>{
        const allBlogs = await blogPosts.find()
        res.status(200).json({blogs: allBlogs, status:200})
    }
}

module.exports = {
    posts
}