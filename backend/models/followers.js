const { followers } = require('../schemas')

class Followers {
    constructor(){
        this.followersModel = followers
    }

    post(data){
        let followerObject = new this.followersModel(data)
        return followerObject.save()
    }

    find(followedTo, followedBy){
        return this.followersModel.findOne({followedTo:followedTo, followedBy: followedBy})
    }

    delete(followedTo,followedBy){
        return this.followersModel.findOneAndDelete({followedBy: followedBy, followedTo: followedTo})
    }

    
}
module.exports = new Followers