const { userHandler } = require('../handlers')

const saveUserDetails = async(req,res)=>{
    const response = await userHandler.saveUserDetails(req,res)
    return response
}


module.exports = {
    saveUserDetails
}