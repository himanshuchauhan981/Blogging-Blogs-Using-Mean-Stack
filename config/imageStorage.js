const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const crypto = require('crypto')
const router = express.Router()

const keys = require('./keys')

const conn = mongoose.createConnection(keys.mongoURI.mongokey, {useNewUrlParser: true})

//Initialize gfs
let gfs

conn.once('open', () =>{
   //Initialize the Stream
   gfs = Grid(conn.db,mongoose.mongo)
   gfs.collection('uploads')
})

//Create Storage engine
const storage = new GridFsStorage({
   url: keys.mongoURI.mongokey,
   file: (req, file) => {
      return new Promise((resolve, reject) => {
         crypto.randomBytes(16, (err, buf) => {
            if (err) {
               return reject(err)
            }
            const filename = buf.toString('hex') + path.extname(file.originalname)
            const fileInfo = {
               filename: filename,
               bucketName: 'uploads'
            }
            resolve(fileInfo)
         })
      })
   }
})
module.exports =  upload = multer({ storage })

//Output Image to Page
router.get('/image/:filename', (request,response) =>{
   gfs.files.findOne({filename:request.params.filename},(err,file) =>{
      const readstream = gfs.createReadStream(file.filename)
      readstream.pipe(response)
   })
})

module.exports = router
