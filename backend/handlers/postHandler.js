const Grid = require('gridfs-stream')
const mongoose = require('mongoose')

const { blogPosts } = require('../models')

const posts = {
    createNewPost: async(req,res) =>{
        console.log(req.user)
        const blogPostObject = new blogPosts({
            postTitle: req.body.postTitle,
            postContent: req.body.postContent,
            postImage: typeof req.file === "undefined" || !req.file ? null : req.file.filename,
            postAuthor: req.user.username
        })
        await blogPostObject.save()
        res.status(200).json({ msg:"New post created",status:200 })
    },
    
    getAllPosts : async(req,res)=>{
        const allBlogs = await blogPosts.find()
        res.status(200).json({blogs: allBlogs, status:200})
    },

    getPostImage : async(req,res)=>{
        let image = {
            filename: req.params.id
        }

        let gfs = Grid(mongoose.connection.db,mongoose.mongo)
        gfs.collection('photos')

        gfs.files.findOne(image,(err,file)=>{
            const readstream = gfs.createReadStream(file.filename)
            readstream.pipe(res)
        })
    },

    getParticularPost : async(req,res)=>{
        let postID = req.params.id

        let postData = await blogPosts.findById(postID)
        res.status(200).json({post: postData,status:200}) 
    }
}

module.exports = {
    posts
}