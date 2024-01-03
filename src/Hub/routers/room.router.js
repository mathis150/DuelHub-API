import express from "express"
import * as userMiddleware from '../middleware/user.middleware.js'
import * as roomMiddleware from '../middleware/room.middleware.js'
import * as messageMiddleware from '../middleware/message.middleware.js'

import * as controller from '../controllers/room.controller.js'



export const router = express.Router()

router.get("/",(req,res) => {
    //TODO: call database to see if its available
    const available = true
    if (available) res.status(200).json({code:200,status:"database is available"})
    res.status(500).json({code:500,status:"database is unavailable at this time"})
})

//get room uuid, name, population
router.get("/:uuid_room",roomMiddleware.roomuuidcheck,controller.getroominfo)
//get room uuid, name, population, message counts, owner, creation date, last message date
router.get("/:uuid_room/details",roomMiddleware.roomuuidcheck,controller.getroominfodetails)
//get room owner info
router.get("/:uuid_room/owner",roomMiddleware.roomuuidcheck,controller.getowner)
//get room owner
router.get("/:uuid_room/owner/details",roomMiddleware.roomuuidcheck,controller.getownerdetails)

//? /:uuid_room/feed/
//get room last few messages
router.get("/:uuid_room/feed",roomMiddleware.roomuuidcheck,controller.getmessagefeed)
//get room last specified number of messages
router.get("/:uuid_room/feed/:offset",roomMiddleware.roomuuidcheck,roomMiddleware.offsetuuidcheck,controller.getmessagefeedwithoffset)
//get room last specified number of messages
router.get("/:uuid_room/feed/:uuid_user/",roomMiddleware.roomuuidcheck,userMiddleware.useruuidcheck,controller.getmessagefromuser)

//create room with given owner and name
router.post("/",roomMiddleware.roombodycheck,controller.addroom)
//rename room
router.post("/:uuid_room/rename/:new_name",roomMiddleware.roomuuidcheck,roomMiddleware.newnamecheck,controller.renameroom)
//add user to room
router.post("/:uuid_room/user/:uuid_user",roomMiddleware.roomuuidcheck,userMiddleware.useruuidcheck,controller.adduser)


//delete room
router.delete("/:uuid_room",roomMiddleware.roomuuidcheck,controller.deleteroom)
//remove user from room
router.delete("/:uuid_room/user/:uuid_user",roomMiddleware.roomuuidcheck,userMiddleware.useruuidcheck,controller.removeuser)
//remove user and all its message from room
router.delete("/:uuid_room/user/:uuid_user/total",roomMiddleware.roomuuidcheck,userMiddleware.useruuidcheck,controller.removeuserandmessage)