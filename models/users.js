const mongoose = require('mongoose')
mongoose.connect('mongodb://blogging_blogs:bloggingAdmin0018@ds161024.mlab.com:61024/blogging_blogs',{ useNewUrlParser: true })

const userSchema = mongoose.Schema({
   username:String,
   email:String,
   password:String
})

const User = mongoose.model('user_data',userSchema)
module.exports = User

module.exports.getExistingUsername = (inputUsername,callback) =>{
   query = {username:inputUsername}
   User.findOne(query,callback)
}

module.exports.createNewUser = (newUser,callback) =>{
   newUser.save(newUser,callback)
}

module.exports.getExistingEmail = (inputEmail,callback) =>{
   query = {email:inputEmail}
   User.findOne(query,callback)
}

module.exports.getPassword = (inputPassword,callback) =>{
   query = {password:inputPassword}
   User.findOne(query,callback)
}

module.exports.getByID  = (id,callback) =>{
   User.findById(id, callback)
}
