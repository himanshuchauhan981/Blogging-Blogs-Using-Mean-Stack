const express = require('express')
const { userController } = require('../controllers')

module.exports = ()=>{
    const router = express.Router()

    router.post('/signup',userController.saveUserDetails)

    router.post('/login',userController.loginUser)
    
    return router
}