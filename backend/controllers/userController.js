const { userHandler } = require('../handlers')

const users = {
    saveUserDetails: async(req,res)=>{
        const response = await userHandler.user.saveUserDetails(req,res)
        return response
    },
    authenticateLoginUser: async(req,res,next) =>{
       const response = await userHandler.user.authenticateLoginUser(req,res,next)
       return response
    },
    getUsernameFromToken : async(req,res,next) =>{
        const response = await userHandler.user.verifyJWTToken(req,res,next)
        return response
    }
}



module.exports = {
    users
}