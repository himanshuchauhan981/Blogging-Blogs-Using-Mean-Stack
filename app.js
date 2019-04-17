const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const expressValidator = require('express-validator')
const expressMessages = require('express-messages')
const date = require('date-and-time')
const passport = require('passport')
const app = express()

app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

//Express Session Middleware
app.use(session({
   secret:'blogging_blogs',
   saveUninitialized: true,
   resave:true
}))

//Express Messages Middleware
app.use(flash());
app.use(function (request, response, next) {
   response.locals.messages = expressMessages(request, response);
   response.locals.currentUser = request.session.currentUser
   response.locals.postImageDetail = request.session.postImageDetail
   next();
});

//Express Validator Middleware
app.use(expressValidator({
   errorFormatter: function(param, msg, value){
      var namespace  = param.split('.')
      , root = namespace.shift()
      , formParam = root;
      while(namespace.length) {
         formParam += '[' + namespace.shift() + ']';
      }
      return {
         param : formParam,
         msg : msg,
         value : value
      };
   }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//Setting Routes
const route = require('./routes/route')
const loginAuthenication = require('./login-authentication')
const Post = require('./models/posts')
const User = require('./models/users')
const StoreImage = require('./imageStorage')

app.use('/',route)
app.use('/',loginAuthenication)
app.use('/',StoreImage)

app.post('/upload',upload.single('file'),(request,response) => {
   postTitle = request.body.postTitle
   postContent = request.body.postContent
   const nowDate = new Date()
   postDate = date.format(nowDate,'MMMM DD, YYYY')
   postAuthor = request.session.currentUser
   const arr = []
   const postData = new Post({
      postTitle:postTitle,
      postContent:postContent,
      postDate: postDate,
      postAuthor:postAuthor,
      postImage:request.file.filename,
      postComment : arr
   })
   Post.saveNewPosts(postData,()=>{
      return response.redirect('/')
   })
})

app.post('/validate',(request,response) => {
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

app.post('/deletePost',(request,response) =>{
   data = request.body
   const keys = Object.keys(data)
   Post.deleteSelectedPost(keys[0], (err,user) =>{
      return response.redirect('/')
   })
})

// Updating Email Address
app.post('/updateEmailAddress', (request,response) =>{
   newEmailAddress = request.body.newEmailAddress
   User.getEmailUpdated(request.session.currentUser, newEmailAddress, (err,user) =>{
      if(user){
         request.flash('success','Email Address Updated')
         return response.redirect('/profile')
      }
   })
})

//Updating User Password
app.post('/updatePassword',(request,response) =>{
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

//Updating Posts
app.post('/updatingPosts/:postTitle',(request, response) =>{
   oldPostTitle = request.params.postTitle
   updatePostTitle = request.body.updatePostTitle
   updatePostContent = request.body.updatePostContent
   Post.updatePostData(oldPostTitle, updatePostTitle, updatePostContent, (err,updateDone) =>{
      if(updateDone){
         request.flash('success','Post is Updated successfully')
         return response.redirect('/')
      }
   })
})

app.post('/updateCoverPhoto',upload.single('file'), (request,response) =>{
   currentuser = request.session.currentUser
   imageDetail = request.file.filename
   User.updateCoverPhotoStatus(currentuser,imageDetail,(err,user) =>{
      request.flash('success','Cover photo is updated successfully')
      response.redirect('/profile')
   })
})

app.post('/updateProfilePhoto',upload.single('file'),(request,response) =>{
   currentuser = request.session.currentUser
   imageDetail = request.file.filename
   User.updateProfilePhotoStatus(currentuser,imageDetail,(err,user) =>{
      request.flash('success','Profile Photo is updated successfully')
      response.redirect('/profile')
   })
})

//Saving Post Comments
app.post('/saveComment/:postTitle',(request,response)=>{
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
                        return response.render('viewPost.ejs',{
                            titlePage:'View Post - Blogging Blogs',
                            data:user,
                            postUser:request.session.currentUser,
                            picURL:currentuser.local.userProfilePic
                        })
                    })
                })
            })
        })

    }
    else{
        return response.redirect('/login')
    }
})

//Setting EJS Template
app.set('view engine','ejs')

//Setting up Views
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'))

//Creating Server
app.listen(5000);
console.log('Server is running at Port - 5000')
