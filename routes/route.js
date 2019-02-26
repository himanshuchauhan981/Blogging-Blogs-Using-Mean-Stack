const express = require('express')
const app = express()
const router = express.Router()
const User = require('../models/users')
const Post = require('../models/posts')
router.get('/',function(request,response){
   Post.getAllPostData((err,post_data) =>{
      len = post_data.length
      return response.render('index.ejs',{
         titlePage:'Home - Blogging Blogs',
         post_data:post_data,
         len:len
      })
   });
});

router.get('/login',function(request,response){
   return response.render('login.ejs',{titlePage:'Login - Blogging Blogs'})
});

router.get('/signup',function(request,response){
   return response.render('signup.ejs',{titlePage:'Signup - Blogging Blogs'})
});

router.get('/createPost',(request,response) =>{
   return response.render('createPost.ejs',{titlePage:'Create Post - Blogging Blogs'})
})

router.post('/validate',(request,response) => {
   inputUsername = request.body.inputUsername
   inputEmail = request.body.inputEmail
   inputPassword = request.body.inputPassword
   const newUser = new User({
      username:inputUsername,
      email:inputEmail,
      password:inputPassword
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


module.exports = router
