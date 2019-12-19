const { postHandler } = require('../handlers')

const post = {
    createNewPost : async(req,res)=>{
        const response = await postHandler.posts.createNewPost(req,res)
        return response
    }
}

module.exports = {
    post
}