const { postHandler } = require('../handlers')

const post = {
    createNewPost : async (req,res)=>{
        const response = await postHandler.posts.createNewPost(req,res)
        return response
    },

    getAllPosts  : async (req,res)=>{
        const response = await postHandler.posts.getAllPosts(req,res)
        return response
    },

    getPostImage : async (req,res)=>{
        const response = await postHandler.posts.getPostImage(req,res)
        return response
    },

    getParticularPost : async (req,res)=>{
        const response = await postHandler.posts.getParticularPost(req,res)
        return response
    }
}

module.exports = {
    post
}