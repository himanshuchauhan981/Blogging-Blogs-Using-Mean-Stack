const express = require('express')
const router = express.Router()
const app = express()
const session = require('express-session')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(session({
   secret:'blogging_blogs',
   saveUninitialized: true,
   resave:true
}))

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth')

router.use(passport.initialize());
router.use(passport.session());

//Setting routes
const User = require('./models/users')

passport.use(new LocalStrategy(
   function(username, password, done){
      User.getExistingUsername(username, (err,user) => {
         if(err) throw err;
         if(!user){
            return done(null,false,{message:'Invalid Username'});
         }
         if(user.password == password){
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

passport.use(
   new GoogleStrategy({

   }).() =>{
      
   }
)

module.exports = router
