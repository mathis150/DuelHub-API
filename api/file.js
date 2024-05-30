import express from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
dotenv.config()

export const fileRouter = express.Router()


function sendError(res,status,message,err) {
  res.status(status).json({
    success:false,
    message:message,
    error:err
  })
}

fileRouter.get("/*",(req,res) => {
  res.sendFile(`${process.env.DATAPATH}/${sanitizePath(req.params[0])}`)
})

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, path.join(process.env.DATAPATH,'upload'))
  },
  filename: (req,file,cb) => {
    console.log(file);
    cb(null, path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})

fileRouter.post("/wiki",upload.single('image'),(req,res) => {
  res.send("image added")
  fs.rename(req.file.path,path.join(process.env.DATAPATH,'wiki',req.body.game,req.body.item,req.file.filename))
})
