const { users } = require('../schemas')
const bcrypt = require('bcryptjs')

const profile = {
    updateProfileEmail : async(req,res)=>{
        let checkExistingEmail = await users.find({email:req.body.userdata})
        if(checkExistingEmail.length == 0){
            const updateStatus = await users.findOneAndUpdate(
                { username:req.params.username },
                { email: req.body.userdata },
                { new: true }
            )
            res.status(200).json({msg:'Email ID updated',data: updateStatus.email})
        }
        else{
            res.status(400).json('Email ID already existed')
        }
        
    },

    getUserProfileData : async(req,res)=>{
        let authorized = false
        if(req.user.username === req.params.username){
            authorized = true
        }
        let userDetails = await users.findOne(
            {
                username:req.params.username
            }
        ).select({email:1, firstName:1, lastName:1, profileImage:1})
        
        res.status(200).json({userDetails, authorized})
    },

    updateUserPassword : async(req,res)=>{
        if(req.user.username === req.params.username){
            const userDetails = await users.findOne({username: req.params.username}).select({password:1})
            let userStatus = bcrypt.compareSync(req.body.currentPassword,userDetails.password)
            if(userStatus){
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(req.body.password,salt)
                await users.findOneAndUpdate({username: req.params.username},{password: hash})
                res.status(200).json('Password Changed successfully')
            }
            else{
                res.status(400).json('Incorrect Current Password')
            }
        }   
    },

    getOtherUserProfileData : async (req,res)=>{
        const profileData = await users.findById(req.query.id).select({username:1})
        res.status(200).send(profileData)
    },

    getAllProfileName : async(req,res)=>{
        const profileName = await users.aggregate(
            [
                {
                    $project: {
                        fullName: { $concat : ["$firstName"," ","$lastName"]}
                    }
                }
            ]
        )
        res.status(200).json(profileName)
    }
}

module.exports = profile