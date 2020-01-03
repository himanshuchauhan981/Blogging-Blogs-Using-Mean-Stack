const { users } = require('../models')
const bcrypt = require('bcryptjs')

const profile = {
    updateProfileEmail : async(req,res)=>{
        let checkExistingEmail = await users.find({email:req.body.userdata})
        if(checkExistingEmail.length == 0){
            const updateStatus = await users.findOneAndUpdate({username:req.params.username},{email: req.body.userdata},{new: true})
            res.status(200).json({status:200, msg:'Email ID updated',data: updateStatus.email})
        }
        else{
            res.status(200).json({status:400, msg:'Email ID already existed'})
        }
        
    },

    updateProfileUsername : async(req,res)=>{
        let checkExistinUsername = await users.find({username: req.body.userdata})
        if(checkExistinUsername.length === 0){
            await users.findOneAndUpdate({username: req.params.username},{username: req.body.userdata})
            res.status(200).json({status:200, msg:'Username updated'})
        }
        else{
            res.status(200).json({status:400,'msg':'Username already existed'})
        }
    },

    getUserProfileData : async(req,res)=>{
        let authorized = false
        if(req.user.username === req.params.username){
            authorized = true
        }
        const userDetails = await users.find({username:req.params.username}).select({email:1,username:1})
        res.status(200).json({status: 200, data: userDetails, msg: 'Success', authorized: authorized})
    },

    updateUserPassword : async(req,res)=>{
        if(req.user.username === req.params.username){
            const userDetails = await users.findOne({username: req.params.username}).select({password:1})
            let userStatus = bcrypt.compareSync(req.body.currentPassword,userDetails.password)
            if(userStatus){
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(req.body.password,salt)
                await users.findOneAndUpdate({username: req.params.username},{password: hash})
                res.status(200).json({status: 200, msg:'Password Changed successfully'})
            }
            else{
                res.status(200).json({status: 400, msg:'Incorrect Current Password'})
            }
        }
        
    }
}

module.exports = profile