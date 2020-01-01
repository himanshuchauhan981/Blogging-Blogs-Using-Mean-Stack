const { users } = require('../models')

const profile = {
    updateUserProfile : async(req,res)=>{
        res.status(200).json({'msg':'success'})
    },

    getUserProfileData : async(req,res)=>{
        const userDetails = await users.find({username:req.params.username}).select({email:1,username:1})
        res.status(200).json({status: 200,data: userDetails,msg:'Success'})
    }
}

module.exports = profile