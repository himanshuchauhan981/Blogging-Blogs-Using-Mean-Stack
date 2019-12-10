const express = require('express')

module.exports = ()=>{
    const router = express.Router()

    router.post('/signup',(req,res)=>{
        res.send( { "hello":"bye" }).status(200)
    })
    return router
}