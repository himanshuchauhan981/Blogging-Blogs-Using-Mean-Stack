const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const expressValidator = require('express-validator')
const expressMessages = require('express-messages')

const app = express()

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
app.use('/',route)
app.use('/',loginAuthenication)

//Setting EJS Template
app.set('view engine','ejs')

//Setting up Views
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'))

//Creating Server
app.listen(5000);
console.log('Server is running at Port - 5000')
