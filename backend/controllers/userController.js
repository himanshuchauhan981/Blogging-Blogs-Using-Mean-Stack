const { userHandler } = require('../handlers')

const saveUserDetails = async(req,res)=>{
    const response = await userHandler.saveUserDetails(req,res)
    return response
}

const loginUser = async(req,res,next)=>{
    const response = await userHandler.loginUser(req,res,next)
    return response
}

module.exports = {
    saveUserDetails,
    loginUser
}