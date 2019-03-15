const express = require('express')
const router = express.Router()
const app = express()
const keys = require('./keys')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy =  require('passport-google-oauth20')
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

//Setting routes
const User = require('./models/users')

passport.serializeUser(function(request,user, done) {
   // console.log(user)
   if(user.local){
      request.session.currentUser = user.local.username
   }
   else if(user.google){
      request.session.currentUser = user.google.username
   }
   else if(user._json){
      request.session.currentUser = user._json.formattedName
   }
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

//Passport Linkedin Strategy
passport.use(
   new LinkedInStrategy({
      clientID : keys.linkedin.clientID,
      clientSecret : keys.linkedin.clientSecret,
      callbackURL : '/auth/linkedin/redirect',
      scope:['r_emailaddress,r_basicprofile'],
      passReqToCallback: true
   },(req,accessToken,refreshToken,profile,done) =>{
      console.log(profile._json.formattedName)
      User.getUsersFromLinkedinSignUp(profile._json.id,(err,currentuser) =>{
         if(currentuser){
            return done(null,currentuser)
         }
         else{
            req.session.accessToken = accessToken;
            process.nextTick(function(){
               new User({
                  method:'linkedin',
                  linkedin:{
                     id:profile._json.id,
                     username:profile._json.formattedName
                  }
               }).save().then((newUser) =>{
                  console.log('New User created : '+newUser);
                  return done(null,profile);
               })
            })
         }
      })
   }
))

//Passport Local Strategy
passport.use(new LocalStrategy(
   function(username, password, done){
      User.getExistingUsername(username, (err,user) => {
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
