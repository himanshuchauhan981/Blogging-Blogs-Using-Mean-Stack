const { profileHandler } = require('../handlers')

const profiles = {

    updateProfileData : async (req,res)=>{
        const response = profileHandler.updateProfileData(req,res)
        return response
    },

    getUserProfileData : async (req,res)=>{
        const response = profileHandler.getUserProfileData(req,res)
        return response
    },

    getOtherUserProfileData : async (req,res)=>{
        const response = profileHandler.getOtherUserProfileData(req,res)
        return response
    },

    getAllProfileName : async (req,res)=>{
        const response = profileHandler.getAllProfileName(req,res)
        return response
    },

    addNewFollower : async (req,res)=>{
        const response = profileHandler.addNewFollower(req,res)
        return response
    },

    removeFollower : async (req,res) =>{
        const response = profileHandler.removeFollower(req,res)
        return response
    },

    getUserFollower : async (req,res) =>{
        const response = profileHandler.getUserFollowers(req,res)
        return response
    },

    getUserFollowing: async (req,res) =>{
        const response = profileHandler.getUserFollowing(req,res)
        return response
    }
}

module.exports = profiles