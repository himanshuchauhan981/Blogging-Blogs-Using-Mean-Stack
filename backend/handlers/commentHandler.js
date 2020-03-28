const { comments } = require('../models')

const comment = {
    getParticularPostComments: async (req, res) => {
        let commentData = await comments.find({ postId: req.query.postId })
        res.status(200).send(commentData)
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
    }
}

module.exports = comment