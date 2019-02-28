const express = require('express')
const router = express.Router()
const app = express()
// const session = require('express-session')
// const cookieParser = require('cookie-parser')
// const cookieSession = require('cookie-session')

const keys = require('./keys')

// app.use(cookieParser())
// app.use(session({
//    secret:'blogging_blogs',
//    saveUninitialized: true,
//    resave:true
// }))
// app.use(cookieSession({
//    maxAge:24*60*60*1000,
//    keys:[keys.session.cookieKey]
// }))

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy =  require('passport-google-oauth20')

router.use(passport.initialize())
router.use(passport.session())

// app.use(passport.initialize())
// app.use(passport.session())

//Setting routes
const User = require('./models/users')

passport.serializeUser(function(request,user, done) {
   request.session.currentUser = request.body.username
   done(null, user.id);
});

passport.deserializeUser(function(id, done) {
   User.getByID(id, function(err, user) {
      done(err, user);
   });
});

//Passport Google Strategy
passport.use(
   new GoogleStrategy({
      callbackURL:'/auth/google/redirect',
      clientID:keys.google.clientID,
      clientSecret:keys.google.clientSecret
   },(accessToken, refreshToken, profile, done) =>{
      User.getUsersFromGoogleSignUp(profile.id,(err,currentUser) =>{
         if(currentUser){
            console.log('user already existed')
            return done(null,currentUser)
         }
         else{
            new User({
               method:'google',
               google:{
                  id:profile.id,
                  username:profile.displayName
               }
            }).save().then((newUser) =>{
               console.log('New User Created : '+newUser)
               return done(null, newUser)
            })
         }
      })
   })
)
passport.use(new LocalStrategy(
   function(username, password, done){
      User.getExistingUsername(username, (err,user) => {
         console.log(user)
         if(err) throw err;
         if(!user){
            return done(null,false,{message:'Invalid Username'});
         }
         if(user.local.password == password){
            return done(null,user)
         }
         else{
            return done(null,false,{message:'Invalid Password'})
         }
      })
   }
));


router.post('/login',
passport.authenticate('local',{successRedirect:'/', failureRedirect:'/login', failureFlash: true}),
function(request,response){
   response.redirect('/')
})

router.get('/logout', (request,response) =>{
   request.logout()
   request.session.destroy()
   response.redirect('/login')
})

module.exports = router
