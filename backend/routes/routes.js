const express = require('express')
const passport = require('passport')

const { userController,postController,commentController } = require('../controllers')
const { upload } = require('../middleware').multerMiddleware

module.exports = ()=>{
    const router = express.Router()

    router.post('/signup',userController.saveUserDetails)

    router.post('/login',userController.authenticateLoginUser)

    router.post('/token',userController.getUsernameFromToken)

    router.post('/post',
        passport.authenticate('jwt'),
        upload.single('postImage'),
        postController.createNewPost
    )

    router.get('/post',
        passport.authenticate('jwt'),
        postController.getAllPosts
    )

    router.get('/image/:id',
        postController.getPostImage
    )

    router.get('/post/:id',
        postController.getParticularPost
    )

    router.post('/comment',
        commentController.saveNewComment
    )

    return router
}
