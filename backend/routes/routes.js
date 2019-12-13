const express = require('express')
const { userController } = require('../controllers')
const passport = require('passport')

const { createToken } = require('../auth').token

module.exports = ()=>{
    const router = express.Router()

    router.post('/signup',userController.saveUserDetails)

    router.get('/successRedirect',(req,res)=>{
        return res.status(200).send("login successful")
    })

    router.get('/failRedirect',(req,res)=>{
        return res.status(401).send("login not possible")
    })

    router.post('/login',(req,res,next)=>{
        passport.authenticate('local',(err,user,info)=>{
            if(err) return next(err)
            if(!user) return res.status(401).send('Invalid Credentials')
            req.logIn(user,(err)=>{
                if (err) { return next(err); }
                let token = createToken(user._id)
                return res.status(200).json({token: token })
            })
        })(req,res,next)
    })

    router.post('/token',passport.authenticate('jwt'),(req,res)=>{
        return res.status(200).send({user: req.user})
    })
    
    router.post('/home',passport.authenticate('jwt'),(req,res)=>{
        res.status(200).send({'msg':'success'})
    })

    return router
}
