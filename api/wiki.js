import express from 'express'

export const wikiRouter = express.Router()

function sendError(res,status,message,err) {
  res.status(status).json({
    success:false,
    message:message,
    error:err
  })
}

wikiRouter.get("/:game",(req,res) => {
  res.sendFile(`${process.env.DATAPATH}/wiki/${req.params.game}/index.html`)
})

wikiRouter.get("/:game/:item",(req,res) => {
  res.sendFile(`${process.env.DATAPATH}/wiki/${req.params.game}/item/${req.params.item}/index.html`)
})

wikiRouter.get("/:game/:item/*",(req,res) => {
  res.sendFile(`${process.env.DATAPATH}/wiki/${req.params.game}/item/${req.params.item}/${sanitizePath(req.params[0])}`)
})