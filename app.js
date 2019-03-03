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

app.use('/',route)
app.use('/',loginAuthenication)

app.post('/savePosts',(request,response) => {
   postTitle = request.body.postTitle
   postContent = request.body.postContent
   const nowDate = new Date()
   postDate = date.format(nowDate,'DD-MM-YYYY')
   postAuthor = request.session.currentUser
   const postData = new Post({
      postTitle:postTitle,
      postContent:postContent,
      postDate: postDate,
      postAuthor:postAuthor
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
         password:inputPassword
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

app.post('/updatePost', (request,response) =>{
   data = request.body
   const keys = Object.keys(data)
   Post.getPostData(keys[0], (err,user) =>{
      return response.render('createPost.ejs',{titlePage:'Update Post - Blogging Blogs',data:user})
   })
})

app.post('/updatingPosts',(request, response) =>{
   console.log(request.body)
})
//Setting EJS Template
app.set('view engine','ejs')

//Setting up Views
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'))

//Creating Server
app.listen(5000);
console.log('Server is running at Port - 5000')
