const { userHandler } = require('../handlers')

const saveUserDetails = async(req,res)=>{
    const response = await userHandler.saveUserDetails(req.body)
    res.status(200).send(response)
}

module.exports = {
    saveUserDetails
}