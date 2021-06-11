const { userModel, followerModel } = require('../models')
const bcrypt = require('bcryptjs')
const user = require('./users')

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
        let followerData = await followerModel.find(userDetails._id, req.user._id)
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
        let followedBy = req.user._id
        let followedTo = await userModel.findByUsername(req.body.profileId).select({_id: 1})
        
        let existingFollower = await followerModel.find(followedTo._id, followedBy)
        if(existingFollower == null){
            await followerModel.post({
                followedBy: followedBy._id,
                followedTo: followedTo._id
            }).then((response) =>{
                res.status(200).json({followStatus: true})
            }).catch((err) => {
                res.status(400).json({followStatus: false})
            })
        }
    },

    removeFollower : async (req,res) =>{
        let followedTo = await userModel.findByUsername(req.params.username).select({_id: 1})
        let followedBy = req.user._id
        let deleteStatus = await followerModel.delete(followedTo._id, followedBy)
        res.status(200).json({removeStatus: deleteStatus != null })
    },

    getUserFollowers : async (req,res) =>{
        let username = await userModel.findByUsername(req.params.username).select({_id: 1})
        let userFollowers = await followerModel.findByFollowedTo(username._id)
        res.status(200).json(userFollowers)
    },

    getUserFollowing : async (req,res) =>{
        let username = await userModel.findByUsername(req.params.username).select({_id: 1})
        let userFollowing = await followerModel.findByFollowedBy(username._id)
        console.log(userFollowing[0])
        res.status(200).json(userFollowing)
    }
}

module.exports = profile