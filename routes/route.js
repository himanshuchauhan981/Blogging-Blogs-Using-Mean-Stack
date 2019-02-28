const express = require('express')
const app = express()
const router = express.Router()
const User = require('../models/users')
const Post = require('../models/posts')

const passport = require('passport')
//const passportSetup = require('.././login-authentication')

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

router.get('/google',passport.authenticate('google',{
   scope:['profile']
}))

router.get('/auth/google/redirect',passport.authenticate('google'),(req,res) =>{
   res.redirect('/')
})
module.exports = router
