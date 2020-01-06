const { profileHandler } = require('../handlers')

const profiles = {
    updateProfileUsername : async (req,res)=>{
        const response = profileHandler.updateProfileUsername(req,res)
        return response
    },

    updateProfileEmail : async (req,res)=>{
        const response = profileHandler.updateProfileEmail(req,res)
        return response
    },

    getUserProfileData : async (req,res)=>{
        const response = profileHandler.getUserProfileData(req,res)
        return response
    },

    updateUserPassword : async (req,res)=>{
        const response = profileHandler.updateUserPassword(req,res)
        return response
    },

    getOtherUserProfileData : async (req,res)=>{
        const response = profileHandler.getOtherUserProfileData(req,res)
        return response
    }
}

module.exports = profiles