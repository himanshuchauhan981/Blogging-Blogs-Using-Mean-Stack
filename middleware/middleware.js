const session = require('express-session')
const express = require('express')
const flash = require('connect-flash')
const expressMessages = require('express-messages')
const expressValidator = require('express-validator')
const app = express()

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

module.exports = app