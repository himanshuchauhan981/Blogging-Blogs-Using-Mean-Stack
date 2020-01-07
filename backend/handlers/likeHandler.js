const { postLikes } = require('../models')

let likes = {
    saveOrDeletePostLike : async(req,res)=>{
        const existingLike = await postLikes.findOne({postId: req.params.postId,userId: req.user._id})
        if(existingLike === null){
            const likeObject = new postLikes({
                postId : req.params.postId,
                userId : req.user._id
            })
            await likeObject.save()
            res.status(200).json({status:200,msg:'like saved'})
        }
        else{
            await postLikes.findOneAndRemove({postId: req.params.postId,userId: req.user._id})
            res.status(200).json({status:404,msg:'Like existed and removed successfully'})
        }
    }
}

module.exports = likes