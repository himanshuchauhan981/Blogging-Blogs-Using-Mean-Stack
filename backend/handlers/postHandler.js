const Grid = require('gridfs-stream')
const mongoose = require('mongoose')

const { blogPosts, comments, users, postLikes } = require('../models')
const { getFirstNameAndLastName }  = require('./userHandler')

async function capitalizeUsername(username){
    let userData = await getFirstNameAndLastName(username)
    userData.firstName = userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1)
    userData.lastName = userData.lastName.charAt(0).toUpperCase() + userData.lastName.slice(1)
    return userData
}

const posts = {
    createNewPost: async (req, res) => {
        let userData = await capitalizeUsername(req.user.username)
        const blogPostObject = new blogPosts({
            postTitle: req.body.postTitle,
            postContent: req.body.postContent,
            postImage: typeof req.file === "undefined" || !req.file ? null : req.file.filename,
            postAuthor: userData.firstName+' '+userData.lastName,
            userId: req.user._id
        })
        await blogPostObject.save((err,post)=>{
            if (err) {
                let error = Object.values(err.errors)[0].message
                res.status(400).send({ status:400,msg:'Unexpected error, Try Again' })
            }
            else {
                res.status(200).send({ status:200, msg: "New post created" })
            }
        })
    },

    getAllPosts: async (req, res) => {
        let skipLimit = parseInt(req.query.skipPostsLimit)
        const allBlogs = await blogPosts.aggregate([
            {
                $project: {
                    "_id": {
                        "$toString": "$_id"
                    },
                    "postTitle": "$postTitle",
                    "postContent": "$postContent",
                    "postDate": "$postDate",
                    "postAuthor": "$postAuthor",
                    "postImage": "$postImage",
                    "userId": "$userId"
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comment"
                }
            }
        ]).sort({ postDate: -1 }).limit(3).skip(skipLimit)
        res.status(200).json({ blogs: allBlogs, status: 200 })
    },

    getPostImage: async (req, res) => {
        let image = {
            filename: req.params.id
        }
                
        let gfs = Grid(mongoose.connection.db, mongoose.mongo)
        gfs.collection('photos')
            gfs.files.findOne(image, (err, file) => {
                if(!err){
                    try{
                        const readstream = gfs.createReadStream(file.filename)
                        readstream.pipe(res)
                    }
                    catch(e){
                        console.log(e)
                    }  
                }
            })
    },

    getParticularPost: async (req, res) => {
        let postID = req.params.id
        let userID = req.user._id
        let likeStatus = false

        let postData = await blogPosts.findById(postID)
        let commentsdata = await comments.find({ postId: postID })
        let likeData = await postLikes.findOne({postId: postID, userId: userID})

        if(likeData != null) likeStatus = true

        res.status(200).json({ post: postData, commentLength: commentsdata.length, status: 200,likeStatus: likeStatus })
    },

    getParticularPostComments: async (req, res) => {
        let commentData = await comments.find({ postId: req.query.postId })
        res.status(200).json({ status: 200, comments: commentData })
    },

    saveNewPostComment: async (req, res) => {
        let arr = []
        let userData = await capitalizeUsername(req.user.username)
        req.body.createdBy = userData.firstName+' '+userData.lastName
        let commentObject = new comments(req.body)
        await commentObject.save(async (err, comment) => {
            if (err) {
                let error = Object.values(err.errors)[0].message
                res.status(200).json({ status: 400, msg: error })
            }
            else {
                arr.push(comment)
                let commentData = await comments.find({ postId: req.body.postId })
                res.status(200).json({ status: 200, msg: 'msg saved', data: arr, length: commentData.length })
            }
        })
    },

    deletePostComment: async (req,res)=>{
        const deleteCommentStatus = await comments.findByIdAndDelete(req.params.id)
        res.status(200).json({ status: 200, msg: 'message deleted', data: deleteCommentStatus })
    },

    getAllParticularUserPost: async (req, res) => {
        let authenticated = false
        if(req.user.username === req.params.username){
            authenticated = true
        }
        let userid = await users.findOne({username: req.params.username}).select({_id:1})
        let userPosts = await blogPosts.aggregate([
            {
                $match: {userId: userid._id}
            },
            { 
                $project:{ postTitle: 1, postContent: 1, postAuthor: 1, postImage: 1, postDate: 1 }
            },
            {
                $lookup:{
                    from:'users',
                    pipeline:[
                        {
                            $match: {_id: userid._id}
                        },
                        {
                            $project:{ profileImage: 1, username: 1 }
                        }
                    ],
                    as:'userdata'
                }
            }
            
        ]).sort({ postDate: -1 })
        res.status(200).json({ status: 200, msg: 'Success', postData: userPosts, authenticated: authenticated })
    },

    deleteParticularPost : async (req,res) =>{
        let postId = req.params.id
        const userPost = await blogPosts.findById(postId)
        let isTrue = Object.toString(req.user._id) === Object.toString(userPost.userId)
        if(userPost != null && isTrue){
            const postDeleteStatus = await blogPosts.findByIdAndRemove(postId)
            res.status(200).json({status:200, msg:'Post deleted', deletedPostId : postDeleteStatus._id})
        }
        else{
            res.status(200).json({status: 404, msg:'Post not found'})
        }
    }
}

module.exports = posts