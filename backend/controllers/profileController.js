const { profileHandler } = require('../handlers')

const profiles = {
    updateUserProfile : async (req,res)=>{
        const response = profileHandler.updateUserProfile(req,res)
        return response
    },
    getUserProfileData : async (req,res)=>{
        const response = profileHandler.getUserProfileData(req,res)
        return response
    }
}

module.exports = profiles