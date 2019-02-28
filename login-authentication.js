const express = require('express')
const router = express.Router()
const app = express()
const session = require('express-session')
const cookieParser = require('cookie-parser')
const expressRouter = require('express-promise-router')

const GooglePlusTokenStrategy = require('passport-google-plus-token')

app.use(cookieParser())
app.use(session({
   secret:'blogging_blogs',
   saveUninitialized: true,
   resave:true
}))

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

router.use(passport.initialize());
router.use(passport.session());

//Setting routes
const User = require('./models/users')

//Google OAuth Strategy
passport.use('googleToken',new GooglePlusTokenStrategy({
   clientID :'192284820445-68v42tsa08bptglg5330ol75f3oc2v4o.apps.googleusercontent.com',
   clientSecret : 'q4WHioSJTPlsIuNkDXI6e6df'
}, async (accessToken, refreshToken, profile, done) =>{
   console.log('Access Token : ',accessToken);
   console.log('Refresh Token : ',refreshToken);
   console.log('Profile : ',profile);
   const newUser = new User({
      method:'google',
      google:{
         id:profile.id,
         email:profile.emails[0].value
      }
   })
   User.createNewUser(newUser,()=>{
      console.log('User created')
   })

}));

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

passport.serializeUser(function(request,user, done) {
   request.session.currentUser = request.body.username
   done(null, user.id);
});

passport.deserializeUser(function(id, done) {
   User.getByID(id, function(err, user) {
      done(err, user);
   });
});

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
