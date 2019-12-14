const express = require('express')
const { userController } = require('../controllers')
const passport = require('passport')

module.exports = ()=>{
    const router = express.Router()

    router.post('/signup',userController.users.saveUserDetails)

    // router.get('/successRedirect',(req,res)=>{
    //     return res.status(200).send("login successful")
    // })

    // router.get('/failRedirect',(req,res)=>{
    //     return res.status(200).send("login not possible")
    // })

    router.post('/login',userController.users.authenticateLoginUser)

    router.post('/token',userController.users.getUsernameFromToken)
    
    router.post('/home',passport.authenticate('jwt'),(req,res)=>{
        res.status(200).send({'msg':'success'})
    })

    return router
}
