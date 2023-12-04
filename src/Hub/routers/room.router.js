import express from "express"
import { htmlError } from "../../errorhandler.utils.js"
import * as userMiddleware from '../middleware/user.middleware.js'
import * as roomMiddleware from '../middleware/room.middleware.js'
import * as messageMiddleware from '../middleware/message.middleware.js'



export const router = express.Router()

router.get("/",(req,res) => {
    //TODO: call database to see if its available
    const available = true
    if (available) res.status(200).json({code:200,status:"database is available"})
    res.status(500).json({code:500,status:"database is unavailable at this time"})
})

//get room uuid, name, population
router.get("/:uuid_room",roomMiddleware.roomuuidcheck)
//get room uuid, name, population, message counts, owner, creation date, last message date
router.get("/:uuid_room/details",roomMiddleware.roomuuidcheck)
//get room owner info
router.get("/:uuid_room/owner",roomMiddleware.roomuuidcheck)
//reroute to user router
router.get("/:uuid_room/owner/*",roomMiddleware.roomuuidcheck)
//get room owner
router.get("/:uuid_room/owner/details",roomMiddleware.roomuuidcheck)

//get room last few messages
router.get("/:uuid_room/feed",roomMiddleware.roomuuidcheck)
//get room last specified number of messages
router.get("/:uuid_room/feed/:depth",roomMiddleware.roomuuidcheck,roomMiddleware.depthuuidcheck)
//reroute to message router
router.get("/:uuid_room/feed/:depth/*",roomMiddleware.roomuuidcheck,roomMiddleware.depthcheck)
//get specified user message list
router.get("/:uuid_room/feed/:uuid_user",roomMiddleware.roomuuidcheck,userMiddleware.useruuidcheck)
//reroute to message router
router.get("/:uuid_room/feed/:uuid_user/*",roomMiddleware.roomuuidcheck,userMiddleware.useruuidcheck)
//reroute to message router
router.get("/:uuid_room/message/*",roomMiddleware.roomuuidcheck)

//create room with given owner
router.post("/",roomMiddleware.roombodycheck)
//add message found in body to room
router.post("/:uuid_room/message",roomMiddleware.roomuuidcheck)
//rename room
router.post("/:uuid_room/rename/:new_name",roomMiddleware.roomuuidcheck,roomMiddleware.newnamecheck)
//add user to room
router.post("/:uuid_room/user/:uuid_user",roomMiddleware.roomuuidcheck,userMiddleware.useruuidcheck)

//delete room
router.delete("/:uuid_room",roomMiddleware.roomuuidcheck)
//delete message in room
router.delete("/:uuid_room/message/:uuid_message",roomMiddleware.roomuuidcheck,messageMiddleware.messageuuidcheck)
//remove user from room
router.delete("/:uuid_room/user/:uuid_user",roomMiddleware.roomuuidcheck,userMiddleware.useruuidcheck)
//remove user and all its message from room
router.delete("/:uuid_room/user/:uuid_user/total",roomMiddleware.roomuuidcheck,userMiddleware.useruuidcheck)