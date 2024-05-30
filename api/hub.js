import express from 'express'
import { events, games, users } from '../src/database/mongo.js';

export const rootRouter = express.Router()

function sendError(res,status,message,err) {
  res.status(status).json({
    success:false,
    message:message,
    error:err
  })
}

rootRouter.get("/",(req,res) => {
  res.status(200).send("Welcum!")
})

rootRouter.get("/game/featured",(req,res) => {
  games.find({featured:true}).toArray().then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    sendError(res,500,"Error occured when fetching featured games",err)
  });
})

rootRouter.get("/game/:name",(req,res) => {
  games.findOne({title: req.params.name}).then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    sendError(res,500,"Error occured when fetching game with name : " + req.params.name,err)
  });
})

rootRouter.get("/user/:handle",(req,res) => {
  users.findOne({handle:req.params.handle}).then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    sendError(res,500,"Error occured when fetching user with the handle : " + req.params.handle,err)
  });
})

rootRouter.get("/event/:name",(req,res) => {
  events.findOne({title: req.params.name}).then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    sendError(res,500,"Error occured when fetching event with name : " + req.params.name,err)
  });
})

rootRouter.post("/game",(req,res) => {
  games.findOne({title: req.body.title}).then((result) => {
    if(!result) {
      games.insertOne({
        title: req.body.title,
        series: req.body.series,
        banner: null
      }).then((result) => {
        res.status(200).send("game added")
      }).catch((err) => {
        sendError(res,500,"Error occured when trying to add game to the database")
      });
    } else {
      res.status(304).send("game already exist")
    }
  }).catch((err) => {
    sendError(res,500,"Error occured when trying to check if game exist in the database")
  });
  
})

rootRouter.post("/event",(req,res) => {
  events.findOne({title: req.body.title}).then((result) => {
    if(!result) {
      events.insertOne({
        title: req.body.title,
        event: req.body.series,
        banner: null,
        date:null
      }).then((result) => {
        res.status(200).send("game added")
      }).catch((err) => {
        sendError(res,500,"Error occured when trying to add game to the database")
      });
    } else {
      res.status(304).send("game already exist")
    }
  }).catch((err) => {
    sendError(res,500,"Error occured when trying to check if game exist in the database")
  });
  
})
