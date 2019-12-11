const express = require('express')
const { userController } = require('../controllers')
const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = ()=>{
    const router = express.Router()

    router.post('/signup',userController.saveUserDetails)

    router.get('/successRedirect',(req,res)=>{
        console.log(res.data)
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
                return res.status(200).send('Login Successful')
            })
        })(req,res,next)
    })
    
    return router
}
