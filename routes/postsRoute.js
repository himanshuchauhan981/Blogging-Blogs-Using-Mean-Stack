const express = require('express')
const router = express.Router()
const Post = require('../models/posts')
const User = require('../models/users')
const date = require('date-and-time')

//Saving new Images and New posts
router.post('/upload',upload.single('file'),(request,response) => {
    postTitle = request.body.postTitle
    postContent = request.body.postContent
    const nowDate = new Date()
    postDate = date.format(nowDate,'MMMM DD, YYYY')
    postAuthor = request.session.currentUser
    const arr = []
    const postData = new Post({
       postTitle : postTitle,
       postContent : postContent,
       postDate : postDate,
       postAuthor : postAuthor,
       postImage : request.file.filename,
       postComment : arr,
       postMethod : request.session.userMethod
    })
    Post.saveNewPosts(postData,()=>{
       return response.redirect('/home')
    })
})

//Deleting Posts
router.post('/deletePost',(request,response) =>{
    data = request.body
    const keys = Object.keys(data)
    Post.deleteSelectedPost(keys[0], (err,user) =>{
       return response.redirect('/')
    })
})

// Updating Email Address
router.post('/updateEmailAddress', (request,response) =>{
    newEmailAddress = request.body.newEmailAddress
    User.getEmailUpdated(request.session.currentUser, newEmailAddress, (err,user) =>{
       if(user){
          request.flash('success','Email Address Updated')
          return response.redirect('/profile')
       }
    })
})

//Updating Posts
router.post('/updatingPosts/:postTitle',(request, response) =>{
    oldPostTitle = request.params.postTitle
    updatePostTitle = request.body.updatePostTitle
    updatePostContent = request.body.updatePostContent
    Post.updatePostData(oldPostTitle, updatePostTitle, updatePostContent, (err,updateDone) =>{
       if(updateDone){
          request.flash('success','Post is Updated successfully')
          return response.redirect('/home')
       }
    })
})

//Saving Post Comments
router.post('/saveComment/:postTitle',(request,response)=>{
    currentuser = request.session.currentUser
    query = {postTitle: request.params.postTitle}
    copyDocs = []
    if(currentuser){
        postComment = request.body.postcomment
        commentObject = {
            postCommentName: request.session.currentUser,
            postCommentContent: request.body.postcomment
        }
        Post.getPostData(request.params.postTitle, (err,docs) =>{
            data = docs.postComment
            Post.savePostComments(request.params.postTitle,data,commentObject,(err,docs) =>{
                Post.getPostData(request.params.postTitle,(err,user)=>{
                    User.getExistingUsername(user.postAuthor, (err,currentuser) =>{
                     if(currentuser.method === 'local'){
                        return response.render('viewPost.ejs',{
                            titlePage:'View Post - Blogging Blogs',
                            data:user,
                            postUser:request.session.currentUser,
                            picURL:currentuser.local.userProfilePic,
                            checkPic: currentuser.local.defaultProfilePic
                        })
                    }
                    else if(currentuser.method ==='google'){
                        return response.render('viewPost.ejs',{
                            titlePage:'View Post - Blogging Blogs',
                            data:user,
                            postUser:request.session.currentUser,
                            picURL:currentuser.google.userProfilePic,
                            checkPic: currentuser.google.defaultProfilePic
                        })
                    }
                    else if(currentuser.method ==='linkedin'){
                        return response.render('viewPost.ejs',{
                            titlePage:'View Post - Blogging Blogs',
                            data:user,
                            postUser:request.session.currentUser,
                            picURL:currentuser.linkedin.userProfilePic,
                            checkPic: currentuser.linkedin.defaultProfilePic
                        })
                    }
                    })
                })
            })
        })

    }
    else{
        return response.redirect('/login')
    }
})

router.post('/validate',(request,response) => {
    inputUsername = request.body.inputUsername
    inputEmail = request.body.inputEmail
    inputPassword = request.body.inputPassword
    const newUser = new User({
       method:'local',
       local:{
          username:inputUsername,
          email:inputEmail,
          password:inputPassword,
          defaultProfilePic:true,
          userProfilePic:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkf1fPtGCX-bHemZlhOvWKRtYw1d9F2kb1Inc1zOgbcBaYpVC8',
          defaultCoverPic:true,
          userCoverPic:'https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-relay.png'
       }
    })
    User.getExistingUsername(inputUsername, (err,userName) => {
       if(userName){
          request.flash('danger','Username Existed')
          return response.render('signup',{titlePage:'Sign Up - Blogging Blogs'})
       }
       else{
          User.getExistingEmail(inputEmail,(err,userEmail) => {
             if(userEmail){
                request.flash('danger','Email ID existed')
                return response.render('signup',{titlePage:'Sign Up - Blogging Blogs'})
             }
             else{
                User.createNewUser(newUser,() =>{
                   return response.render('login.ejs',{titlePage:'Login - Blogging Blogs'})
                });
             }
          })
       }
    })
 })
 
 //Updating User Password
 router.post('/updatePassword',(request,response) =>{
    oldPassword = request.body.old_password
    newPassword = request.body.new_password
    currentuser = request.session.currentUser
    User.checkOldPassword(request.session.currentUser,oldPassword,(err,passwordCheck) =>{
       if(passwordCheck){
          User.updatePassword(currentuser,newPassword, (err,user) =>{
             if(user){
                request.flash('success','Password updated successfully')
                return response.redirect('/profile')
             }
          })
       }
       else{
          request.flash('danger','Incorrect Old Password')
          return response.redirect('/profile')
       }
    })
 
 })
 
 //Updating Cover Photo
 router.post('/updateCoverPhoto',upload.single('file'), (request,response) =>{
    currentuser = request.session.currentUser
    imageDetail = request.file.filename
    User.updateCoverPhotoStatus(currentuser,imageDetail,(err,user) =>{
       request.flash('success','Cover photo is updated successfully')
       response.redirect('/profile')
    })
 })
 
 //UpdatingProfilePhoto
 router.post('/updateProfilePhoto',upload.single('file'),(request,response) =>{
    currentuser = request.session.currentUser
    imageDetail = request.file.filename
    User.updateProfilePhotoStatus(currentuser,imageDetail,(err,user) =>{
       request.flash('success','Profile Photo is updated successfully')
       response.redirect('/profile')
    })
 })
 
module.exports = router