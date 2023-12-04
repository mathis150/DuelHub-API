import express from "express"
import * as messageMiddleware from '../middleware/message.middleware.js'

export const router = express.Router()

router.get("/",(req,res) => {
    //TODO: call database to see if its available
    const available = true
    if (available) res.status(200).json({code:200,status:"database is available"})
    res.status(500).json({code:500,status:"database is unavailable at this time"})
})

//get specified message text
router.get("/:uuid_message",messageMiddleware.messageuuidcheck)
//get specified message text, owner, creation date, modified, uuid_reply
router.get("/:uuid_message/details",messageMiddleware.messageuuidcheck)
//reroute to message router with reply uuid
router.get("/:uuid_message/reply",messageMiddleware.messageuuidcheck)
//reroute to message router with reply uuid
router.get("/:uuid_message/reply/*",messageMiddleware.messageuuidcheck)

//add message using body
router.post("/")
//edit message using body
router.post("/:uuid_message",messageMiddleware.messageuuidcheck)

//remove message
router.delete("/:uuid_message",messageMiddleware.messageuuidcheck)