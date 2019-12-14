const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

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

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
        secretOrKey: 'gRG9lIiwiaWF0IjoxNTE2MjM5'
    },
    function(jwtPayload,cb){
        return users.findById(jwtPayload.userId).select({username:1, email: 1})
            .then(user =>{
                return cb(null,user)
            })
            .catch(err =>{
                console.log(err)
                return cb(err)
            })
        }
    ))
}
