const { userModel, followerModel } = require('../models')
const bcrypt = require('bcryptjs')

const profile = {
    updateProfileData : async(req,res)=>{
        let username = req.params.username
        let email = req.body.email
        let type = req.query.type
        if(type == 'name'){
            const updateStatus = await userModel.update(username, {firstName: req.body.firstName, lastName: req.body.lastName})
            res.status(200).json({msg: 'Name updated',firstName: updateStatus.firstName, lastName: updateStatus.lastName})
        }
        else if(type =='email'){
            let checkExistingEmail = await userModel.findByEmail(req.body.userdata)
            if(checkExistingEmail.length == 0){
                const updateStatus = await userModel.update(username, {
                    email: email
                })
                res.status(200).json({msg:'Email ID updated',email: updateStatus.email})
            }
            else{
                res.status(400).json('Email ID already existed')
            }
        }
        else if(type =='password'){
            if(req.user.username === req.params.username){
                const userDetails = await userModel.findByUsername(req.params.username).select({password:1})
                let userStatus = bcrypt.compareSync(req.body.currentPassword,userDetails.password)
                if(userStatus){
                    let salt = bcrypt.genSaltSync(10)
                    let hash = bcrypt.hashSync(req.body.password,salt)
                    await userModel.updatePassword(req.params.username, hash)
                    res.status(200).json({msg:'Password Changed successfully'})
                }
                else{
                    res.status(400).json('Incorrect Current Password')
                }
            }
        }
    },

    getUserProfileData : async(req,res)=>{
        let authorized = false
        if(req.user.username === req.params.username){
            authorized = true
        }
        let userDetails = await userModel.findByUsername(req.params.username).select({email:1, firstName:1, lastName:1, profileImage:1})
        let followerData = await followerModel.find(req.params.username,req.user.username)
        let followerStatus = followerData !== null
        res.status(200).json({userDetails, authorized, followerStatus})
    },

    getOtherUserProfileData : async (req,res)=>{
        const profileData = await userModel.findById(req.query.id).select({username:1})
        res.status(200).send(profileData)
    },

    getAllProfileName : async(req,res)=>{
        const profileName = await userModel.find()
        res.status(200).json(profileName)
    },

    addNewFollower : async (req,res)=>{
        let followedBy = req.user.username
        let followedTo = req.body.profileId
 
        await followerModel.post({
            followedBy: followedBy,
            followedTo: followedTo
        }).then((response) =>{
            res.status(200).json({followStatus: true})
        }).catch((err) => {
            res.status(400).json({followStatus: false})
        })
    },

    removeFollower : async (req,res) =>{
        let followedTo = req.params.username
        let followedBy = req.user.username
        let deleteStatus = await followerModel.delete(followedTo, followedBy)
        res.status(200).json({removeStatus: deleteStatus != null })
    }
}

module.exports = profile