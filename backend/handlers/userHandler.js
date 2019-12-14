const { users } = require('../models')
const passport = require('passport')
const { createToken } = require('../auth').token

const user = {
    saveUserDetails: async (req, res) => {
        let user = new users(req.body)
        let userStatus = await users.findOne({ $and: [{ email: user.email }, { username: user.username }] })
        if (userStatus == null) {
            await user.save((err, user) => {
                if (err) {
                    let error = Object.values(err.errors)[0].message
                    res.status(400).send(error)
                }
                else {
                    res.status(200).send({ 'dataStatus': 'Saved Details' })
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
            if (!user) return res.status(401).send('Invalid Credentials')
            req.logIn(user, (err) => {
                if (err) { return next(err); }
                let token = createToken(user._id)
                return res.status(200).json({ token: token })
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
    }
}

module.exports = {
    user
}