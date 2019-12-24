const express = require('express')
const passport = require('passport')

const { userController,postController } = require('../controllers')
const { upload } = require('../middleware').multerMiddleware

module.exports = ()=>{
    const router = express.Router()

    router.post('/signup',userController.users.saveUserDetails)

    router.post('/login',userController.users.authenticateLoginUser)

    router.post('/token',userController.users.getUsernameFromToken)
    
    router.post('/home',passport.authenticate('jwt'),(req,res)=>{
        res.status(200).send({'msg':'success'})
    })

    router.post('/post',
        passport.authenticate('jwt'),
        upload.single('postImage'),
        postController.post.createNewPost
    )

    return router
}
