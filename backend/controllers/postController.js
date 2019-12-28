const { postHandler } = require('../handlers')

const post = {
    createNewPost : async (req,res)=>{
        const response = await postHandler.createNewPost(req,res)
        return response
    },

    getAllPosts  : async (req,res)=>{
        const response = await postHandler.getAllPosts(req,res)
        return response
    },

    getPostImage : async (req,res)=>{
        const response = await postHandler.getPostImage(req,res)
        return response
    },

    getParticularPost : async (req,res)=>{
        const response = await postHandler.getParticularPost(req,res)
        return response
    },

    getParticularPostComments: async (req,res)=>{
        const response = await postHandler.getParticularPostComments(req,res)
        return response
    },

    saveNewPostComment : async (req,res)=>{
        const response = await postHandler.saveNewPostComment(req,res)
        return response
    }


}

module.exports = post