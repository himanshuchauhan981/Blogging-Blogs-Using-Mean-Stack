const{ comments } = require('../models')

const comment = {
    saveNewComment :  async(req,res)=>{
        req.body.createdBy = req.user.username
        let commentObject = new comments(req.body)
        await commentObject.save((err,user)=>{
            if(err){
                let error = Object.values(err.errors)[0].message
                res.status(200).json({status:400, error: error})
            }
            else{
                res.status(200).json({status:200, msg:'msg saved'})
            }
        })
        
    }
}

module.exports = comment
