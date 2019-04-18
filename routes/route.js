const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()
const router = express.Router()

const User = require('../models/users')
const Post = require('../models/posts')
const StoreImage = require('../imageStorage')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

router.get('/',(request,response) =>{
   Post.getAllPostData((err,post_data) =>{
      len = post_data.length
      for(var i=0;i<len;i++){
         post_data[i].postContent = post_data[i].postContent.substring(0,300)+'.....'
      }
      return response.render('index.ejs',{
         titlePage:'Home - Blogging Blogs',
         post_data:post_data,
         len:len
      })
   })
})

router.get('/login',(request,response) =>{
   return response.render('login.ejs',{titlePage:'Login - Blogging Blogs'})
})

router.get('/signup',(request,response) =>{
   return response.render('signup.ejs',{titlePage:'Signup - Blogging Blogs'})
})

router.get('/createPost',(request,response) =>{
   if(request.session.currentUser){
      return response.render('createPost.ejs',{titlePage:'Create Post - Blogging Blogs'})
   }
   else{
      return response.redirect('/')
   }
})

router.post('/viewPost',(request,response) =>{
    data = request.body
    const keys = Object.keys(data)
    Post.getPostData(keys[0],(err,user)=>{
        User.getUsersByMethod(user.postMethod,user.postAuthor, (err,currentuser) =>{
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


router.post('/updatePost', (request,response) =>{
   data = request.body
   const keys = Object.keys(data)
   Post.getPostData(keys[0], (err,user) =>{
      if(request.session.currentUser){
         return response.render('createPost.ejs',{
             titlePage:'Update Post - Blogging Blogs',
             data:user
         })
      }
      else{
         return response.redirect('/')
      }
   })
})

router.get('/google',passport.authenticate('google',{
   scope:['profile']
}))


router.get('/auth/google/redirect',passport.authenticate('google'),(req,res) =>{
   res.redirect('/')
})

router.get('/auth/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE' }),
  function(req, res){
     console.log('its working')
  });

router.get('/auth/linkedin/redirect',passport.authenticate('linkedin', { failureRedirect: '/login' }),
   function(req, res){
      res.redirect('/');
   }
);

router.get('/profile',(request,response) =>{
   User.getExistingUsername(request.session.currentUser,(err,data) =>{
      return response.render('profile.ejs',{titlePage:'Profile - Blogging Blogs',data:data})
   })

})

module.exports = router
