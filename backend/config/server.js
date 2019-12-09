const dotenv = require('dotenv')
const express = require('express')
const app = express()

dotenv.config()
const { HOST,PORT } = require('./config')

app.listen(PORT,HOST,(err)=>{
    if(err) console.log(err)
    else console.log(`Running on ${HOST}:${PORT}`)
})

