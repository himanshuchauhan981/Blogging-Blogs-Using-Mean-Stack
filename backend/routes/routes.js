const express = require('express')
const passport = require('passport')

const { userController,postController,profileController } = require('../controllers')
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

    router.get('/post/:id',
        postController.getParticularPost
    )

    router.delete('/post/:id',
        passport.authenticate('jwt'),
        postController.deleteParticularPost
    )

    router.get('/image/:id',
        postController.getPostImage
    ) 

    router.post('/comment',
        passport.authenticate('jwt'),
        postController.saveNewPostComment
    )

    router.get('/comment',
        passport.authenticate('jwt'),
        postController.getParticularPostComments
    )

    router.delete('/comment/:id',
        passport.authenticate('jwt'),
        postController.deletePostComment
    )

    router.get(['/:username','/profile/:username'],
        passport.authenticate('jwt'),
        profileController.getUserProfileData
    )

    router.patch('/:username/username',
        passport.authenticate('jwt'),
        profileController.updateProfileUsername
    )

    router.patch('/:username/email',
        passport.authenticate('jwt'),
        profileController.updateProfileEmail
    )

    router.get('/:username/posts',
        // passport.authenticate('jwt'),
        postController.getAllParticularUserPost
    )

    router.patch('/:username/password',
        passport.authenticate('jwt'),
        profileController.updateUserPassword
    )

    router.get('/profile/id/:id',
        passport.authenticate('jwt'),
        profileController.getOtherUserProfileData
    )

    return router
}
