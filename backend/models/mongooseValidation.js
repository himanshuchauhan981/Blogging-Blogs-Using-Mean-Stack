const setValidationError = (type,path) =>{
    if(type=="minlength" && path=="username"){
        return { msg: 'Minimum username should be 5 characters'}
    }
}

module.exports = {
    setValidationError
}