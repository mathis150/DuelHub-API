import express from 'express'
import { message, topic } from '../src/database/mongo.js'
import { ObjectId } from 'mongodb'
import { needLogin } from './middleware.js'

export const forumRouter = express.Router()

function sendError(res,status,message,err) {
  res.status(status).json({
    success:false,
    message:message,
    error:err
  })
}

const FORUMLIMIT = 20
const MESSAGELIMIT = 50

//return the last {{FORUMLIMIT}} topics in the forum
forumRouter.get("/",(req,res) => {
  const start = req.query.page ? req.query.page * FORUMLIMIT : 0
  topic.find({}).sort({_id : -1}).skip(start).limit(FORUMLIMIT).toArray().then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    if (req.query.page) {
      sendError(res,500,"Error occured when trying to get forum page number : " + req.query.page,err)
    } else {
      sendError(res,500,"Error occured when trying to fetch the forum feed",err)
    }
  });
})

//add a topic to the database
forumRouter.post("/",needLogin,(req,res) => {
  topic.insertOne({
    title: req.body.title,
    date: new Date(),
    tag: req.body.tags
  }).then((result) => {
    res.status(200).send(result.insertedId)
  }).catch((err) => {
    sendError(res,500,"Error occurend when trying to add a topic to the forum")
  });
})

//get the las messages of a topic given a page number
forumRouter.get("/:topicId",(req,res) => {
  const start = req.query.page ? req.query.page * MESSAGELIMIT : 0
  message.find({topic:new ObjectId(req.params.topicId)}).skip(start).limit(MESSAGELIMIT).toArray().then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    if (req.query.page) {
      sendError(res,500,"Error occured when trying to get forum page number : " + req.query.page,err)
    } else {
      sendError(res,500,"Error occured when trying to fetch the forum feed",err)
    }
  });
})

//add a message to a topic
forumRouter.post("/:topicId",needLogin,(req,res) => {  
  const doc = {
    authorId : req.body.authorId,
    content : req.body.content,
    time : new Date()
  }

  message.insertOne(doc).then((result) => {
    res.status(200).send("message successfully sent")
  }).catch((err) => {
    sendError(res,500,"Error occured when sending message : " + JSON.stringify(doc),err)
  });
})
