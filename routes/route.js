const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const User = require('../models/users')
const Post = require('../models/posts')
const passport = require('passport')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

router.get('/',(request,response) =>{
   Post.getAllPostData((err,post_data) =>{
      len = post_data.length
      return response.render('index.ejs',{
         titlePage:'Home - Blogging Blogs',
         post_data:post_data,
         len:len
      })
   });
});

router.get('/login',(request,response) =>{
   return response.render('login.ejs',{titlePage:'Login - Blogging Blogs'})
});

router.get('/signup',(request,response) =>{
   return response.render('signup.ejs',{titlePage:'Signup - Blogging Blogs'})
});

router.get('/createPost',(request,response) =>{
   return response.render('createPost.ejs',{titlePage:'Create Post - Blogging Blogs'})
})

router.post('/viewPost',(request,response) =>{
   data = request.body
   const keys = Object.keys(data)
   Post.getPostData(keys[0],(err,user)=>{
      return response.render('viewPost.ejs',{titlePage:'View Post - Blogging Blogs',data:user,postUser:request.session.currentUser})
   })
})

router.get('/google',passport.authenticate('google',{
   scope:['profile']
}))

router.get('/auth/google/redirect',passport.authenticate('google'),(req,res) =>{
   res.redirect('/')
})

router.get('/profile',(request,response) =>{
   return response.render('profile.ejs',{titlePage:'Profile - Blogging Blogs'})
})

module.exports = router
