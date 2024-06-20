import express from 'express'

export const wikiRouter = express.Router()

function sendError(res,status,message,err) {
  res.status(status).json({
    success:false,
    message:message,
    error:err
  })
}

//get the main page for the given game ex: supersmashbrothersmelee
wikiRouter.get("/:game",(req,res) => {
  res.sendFile(`${process.env.DATAPATH}/wiki/${req.params.game}/index.html`)
})

//get the page for a given item of a given game ex: guiltigearstrive/universalmechanics
wikiRouter.get("/:game/:item",(req,res) => {
  res.sendFile(`${process.env.DATAPATH}/wiki/${req.params.game}/item/${req.params.item}/index.html`)
})

//get the page for a given subitem in a given game ex: tekken7/characters/kagura
wikiRouter.get("/:game/:item/*",(req,res) => {
  res.sendFile(`${process.env.DATAPATH}/wiki/${req.params.game}/item/${req.params.item}/${sanitizePath(req.params[0])}`)
})