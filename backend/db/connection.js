const mongoose = require('mongoose')

const url = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`

const conn = mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }, (err,conn) => {
    if (err) {
        console.log('Mongo error ', err)
    }
    else {
        console.log('Mongoose Connection is Successful')
    }
})

module.exports = {
    conn
}