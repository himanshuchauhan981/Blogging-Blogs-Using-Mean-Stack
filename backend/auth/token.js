const createToken = (username) =>{
    let privateKey = 'gRG9lIiwiaWF0IjoxNTE2MjM5'
    var token = jwt.sign({username:username},privateKey,{algorithm:'RS256'})
    return token
}

module.exports = {
    createToken
}