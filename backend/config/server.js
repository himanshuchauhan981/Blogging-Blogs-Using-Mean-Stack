const dotenv = require('dotenv')
const express = require('express')
const app = express()
const {routes} = require('../routes')

dotenv.config()
const { HOST,PORT } = require('./config')
require('../db').connection

app.use('/',routes())

app.listen(PORT,HOST,(err)=>{
    if(err) console.log(err)
    else console.log(`Running on ${HOST}:${PORT}`)
})

