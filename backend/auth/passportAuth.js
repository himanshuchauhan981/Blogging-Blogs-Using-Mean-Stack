const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')

const { users } = require('../models')

module.exports = (passport)=>{
    passport.use(new LocalStrategy(
        (username,password,done) =>{
            users.findOne({$and:[{username: username},{password: password}]}, (err,user) =>{
                if(err) return done(err)
                if(!user){
                    return done(null, false,{ message : 'Incorrect Credentials'})
                }
                return done(null,user)
            }).select({'username':1})
        }
    ))
    
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    
    passport.deserializeUser((id,done)=>{
        users.findById(id,(err,user)=>{
            done(err,user)
        })
    })
}
