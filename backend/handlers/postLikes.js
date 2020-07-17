const { postLikes } = require('../schemas')

let likes = {
    saveOrDeletePostLike : async(req,res)=>{
        const existingLike = await postLikes.findOne({postId: req.params.postId,userId: req.user._id})
        if(existingLike === null){
            const likeObject = new postLikes({
                postId : req.params.postId,
                userId : req.user._id
            })
            await likeObject.save()
            res.status(200).send(true)
        }
        else{
            await postLikes.findOneAndRemove({postId: req.params.postId,userId: req.user._id})
            res.status(200).send(false)
        }
    }
}

module.exports = likes