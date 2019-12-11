const express = require('express')
const { userController } = require('../controllers')
const passport = require('passport')

module.exports = ()=>{
    const router = express.Router()

    router.post('/signup',userController.saveUserDetails)

    router.get('/successRedirect',(req,res)=>{
        return res.status(200).send("login successful")
    })

    router.get('/failRedirect',(req,res)=>{
        return res.status(401).send("login not possible")
    })

    router.post('/login',
    passport.authenticate('local',{successRedirect:'/api/successRedirect',failureRedirect:'/api/failRedirect'}),
    (req,res)=>{
        
    })
    
    return router
}
