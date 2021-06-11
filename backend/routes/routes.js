const express = require('express')
const passport = require('passport')

const { userController,postController,profileController,likeController,commentController } = require('../controllers')
const { upload } = require('../middleware').multerMiddleware

module.exports = ()=>{
    const router = express.Router()

    router.post('/signup',userController.saveUserDetails)

    router.post('/signup/image',
        upload.single('profileImage'),
        userController.saveProfilePic
    )

    router.post('/login',
        userController.authenticateLoginUser
    )

    router.post('/token',
        userController.getUsernameFromToken
    )

    router.post('/post',
        passport.authenticate('jwt'),
        upload.single('postImage'),
        postController.createNewPost
    )

    router.get('/post',
        passport.authenticate('jwt'),
        postController.getAllPosts
    )

    router.get('/post/top',
        passport.authenticate('jwt'),
        postController.getTopPosts
    )

    router.get('/post/:id',
        passport.authenticate('jwt'),
        postController.getParticularPost
    )

    router.delete('/post/:id',
        passport.authenticate('jwt'),
        postController.deleteParticularPost
    )

    router.get('/image/:id',
        postController.getPostImage
    )

    router.get('/user/image/:id',
        userController.getUserImage
    )

    router.post('/comment',
        passport.authenticate('jwt'),
        commentController.saveNewPostComment
    )

    router.get('/comment',
        passport.authenticate('jwt'),
        commentController.getParticularPostComments
    )

    router.delete('/comment/:id',
        passport.authenticate('jwt'),
        commentController.deletePostComment
    )

    router.get('/profile/name',
        passport.authenticate('jwt'),
        profileController.getAllProfileName
    ),

    router.get('/profile/id',
        passport.authenticate('jwt'),
        profileController.getOtherUserProfileData
    ),

    router.get(['/:username','/profile/:username'],
        passport.authenticate('jwt'),
        profileController.getUserProfileData
    )

    router.patch('/:username',
        passport.authenticate('jwt'),
        profileController.updateProfileData
    )

    router.get('/:username/posts',
        passport.authenticate('jwt'),
        postController.getAllParticularUserPost
    )

    router.get('/:username/following',
        passport.authenticate('jwt'),
        profileController.getUserFollowing
    )

    router.get('/:username/followers',
        passport.authenticate('jwt'),
        profileController.getUserFollower
    )

    router.post('/:username/follower',
        passport.authenticate('jwt'),
        profileController.addNewFollower
    )

    router.delete('/:username/follower',
        passport.authenticate('jwt'),
        profileController.removeFollower
    )

    router.post('/:postId/like',
        passport.authenticate('jwt'),
        likeController.saveOrDeletePostLike
    )

    router.patch('/:username/:postId',
        passport.authenticate('jwt'),
        upload.single('postImage'),
        postController.editPost
    )

    return router
}
