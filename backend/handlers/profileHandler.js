const { users } = require('../models')

const profile = {
    updateProfileEmail : async(req,res)=>{
        let checkExistingEmail = await users.find({email:req.body.userdata})
        if(checkExistingEmail.length == 0){
            await users.findOneAndUpdate({username:req.params.username},{email: req.body.userdata})
            res.status(200).json({status:200, msg:'Email ID updated'})
        }
        else{
            res.status(200).json({status:400, msg:'Email ID already existed'})
        }
        
    },

    updateProfileUsername : async(req,res)=>{
        let checkExistinUsername = await users.find({username: req.body.userdata})
        if(checkExistinUsername.length === 0){
            await users.findOneAndUpdate({username: req.params.username},{email: req.body.userdata})
            res.status(200).json({status:200, msg:'Username updated'})
        }
        else{
            res.status(200).json({status:200,'msg':'Username already existed'})
        }
    },

    getUserProfileData : async(req,res)=>{
        console.log(req.params)
        const userDetails = await users.find({username:req.params.username}).select({email:1,username:1})
        res.status(200).json({status: 200,data: userDetails,msg:'Success'})
    }
}

module.exports = profile