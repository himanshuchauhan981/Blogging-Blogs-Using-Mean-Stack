const { commentHandler }  = require('../handlers')

const comment = {
    saveNewComment : async(req,res) =>{
        const response = await commentHandler.saveNewComment(req,res)
        // return response
    }
}

module.exports = comment