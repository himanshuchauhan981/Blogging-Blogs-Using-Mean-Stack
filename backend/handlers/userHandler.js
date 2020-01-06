const { users } = require('../models')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const { createToken } = require('../auth').token

const user = {
    saveUserDetails: async (req, res) => {
        let userStatus = await users.findOne({ $and: [{ email: user.email }, { username: user.username }] })
        if (userStatus == null) {
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(req.body.password,salt)
            req.body.password = hash

            let user = new users(req.body)
            
            await user.save((err, user) => {
                if (err) {
                    let error = Object.values(err.errors)[0].message
                    res.status(400).send(error)
                }
                else {
                    res.status(200).send({ status:200, msg:'Data Saved',data: user._id })
                }
            })
        }
        else {
            res.status(400).send('User already existed')
        }
    },

    authenticateLoginUser: async (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err)
            if (!user) return res.status(200).send({status:401, msg:'Invalid Credentials'})
            req.logIn(user, (err) => {
                if (err) { return next(err); }
                let token = createToken(user._id)
                return res.status(200).json({ status: 200, msg: 'Login Successful', token: token })
            })
        })(req, res, next)
    },

    verifyJWTToken: async (req, res, next) => {
        passport.authenticate('jwt', (err, user, info) => {
            if (err) return next(err)
            if (!user) {
                return res.status(200).json({
                    status: 401,
                    error: 'Unauthorized User'
                })
            }
            return res.status(200).json({
                status: 200,
                user: user,
                msg : 'Authorized User'
            })

        })(req, res, next)
    },

    getFirstNameAndLastName : async (username)=>{
        let data = await users.findOne({username: username}).select({firstName:1,lastName:1})
        return data
    },

    saveProfilePic : async(req,res)=>{
        let id = mongoose.Types.ObjectId(req.body.userId)

        await users.findOneAndUpdate({_id: id},{profileImage:req.file.filename})
        res.status(200).json({status:200, msg:'Image saved'})
    }
}

module.exports = user