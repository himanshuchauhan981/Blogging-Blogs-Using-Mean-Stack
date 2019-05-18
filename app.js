const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const app = express()

app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//Setting Routes
const middleware = require('./middleware/middleware')
const route = require('./routes/route')
const postRoutes = require('./routes/postsRoute')
const loginAuthenication = require('./config/login-authentication')
const StoreImage = require('./config/imageStorage')

app.use('/',middleware)
app.use('/',route)
app.use('/',postRoutes)
app.use('/',loginAuthenication)
app.use('/',StoreImage)

//Setting EJS Template
app.set('view engine','ejs')

//Setting up Views
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'))

//Creating Server
const port = process.env.PORT || 5000
const server = app.listen(port,()=>{
    console.log('Server is running at Port - 5000')
});
