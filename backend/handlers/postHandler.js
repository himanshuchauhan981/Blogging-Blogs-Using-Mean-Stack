const posts = {
    createNewPost: async(req,res) =>{
        console.log(req.body)
        res.status(200).send({"msg":"postSaved"})
    }
}

module.exports = {
    posts
}