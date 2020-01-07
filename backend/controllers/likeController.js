const { likeHandler } = require('../handlers')

const like = {
    saveOrDeletePostLike : async(req,res)=>{
        const response = await likeHandler.saveParticularPostLike(req,res)
        return response
    }
}

module.exports = like