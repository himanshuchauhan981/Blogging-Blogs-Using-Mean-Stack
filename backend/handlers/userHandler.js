const { users } = require('../models')
const { mongooseValidation } = require('../models')

const saveUserDetails = async(req,res) =>{
    let user = new users(req.body)
    await user.save((err,user)=>{
        if(err){
            let error = Object.values(err.errors)[0].message
            res.status(400).send(error)
        }
        else{
            res.status(200).send({'dataStatus':'Saved Details'})
        }
    })
}

module.exports = {
    saveUserDetails
}