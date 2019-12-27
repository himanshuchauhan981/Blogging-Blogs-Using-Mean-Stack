const express = require('express')
const passport = require('passport')

const { userController,postController } = require('../controllers')
const { upload } = require('../middleware').multerMiddleware

module.exports = ()=>{
    const router = express.Router()

    router.post('/signup',userController.users.saveUserDetails)

    router.post('/login',userController.users.authenticateLoginUser)

    router.post('/token',userController.users.getUsernameFromToken)

    router.post('/post',
        passport.authenticate('jwt'),
        upload.single('postImage'),
        postController.post.createNewPost
    )

    router.get('/post',
        passport.authenticate('jwt'),
        postController.post.getAllPosts
    )

    router.get('/image/:id',
        postController.post.getPostImage
    )

    router.get('/post/:id',
        postController.post.getParticularPost
    )

    router.post('/comment',{
        
    })

    return router
}
