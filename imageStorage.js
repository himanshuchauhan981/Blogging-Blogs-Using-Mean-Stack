const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const crypto = require('crypto')

const keys = require('./keys')
const app = express()

const conn = mongoose.createConnection(keys.mongoURI.mongokey)

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
               return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
               filename: filename,
               bucketName: 'uploads'
            };
            resolve(fileInfo);
         });
      });
   }
});
module.exports =  upload = multer({ storage })
