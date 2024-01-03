import express from "express"
import * as userMiddleware from '../middleware/user.middleware.js'
import * as roomMiddleware from '../middleware/room.middleware.js'
import * as gameMiddleware from '../middleware/game.middleware.js'

import * as controller from '../controllers/user.controller.js'

export const router = express.Router()

router.get("/",(req,res) => {
    //TODO: call database to see if its available
    const available = true
    if (available) res.status(200).json({code:200,status:"database is available"})
    res.status(500).json({code:500,status:"database is unavailable at this time"})
})

//get user uuid, username 
router.get("/:uuid_user",userMiddleware.useruuidcheck,controller.getuser)
//get user uuid, username, email, last_connection, first_connection
router.get("/:uuid_user/details",userMiddleware.useruuidcheck,controller.getuserdetails)

//get user uuid, username, friends_uuid
router.get("/:uuid_user/friendlist",userMiddleware.useruuidcheck,controller.getuserfriendlist)
//get user uuid, username, favorite_uuid
router.get("/:uuid_user/favoritelist",userMiddleware.useruuidcheck,controller.getuserfavoritelist)
//get user's gamelist
router.get("/:uuid_user/gamelist",userMiddleware.useruuidcheck,controller.getusergamelist)
//get user rooms
router.get("/:uuid_user/roomlist",userMiddleware.useruuidcheck,controller.getuserroomlist)

//get user with username
router.get("/search/:username",userMiddleware.usernamecheck,controller.getuserbyusername)

//create user with given body
router.post("/",userMiddleware.userbodycheck,controller.createuser)
//add favorite to user's favoritelist
router.post("/:uuid_user/favorite/:uuid_favorite",userMiddleware.useruuidcheck,userMiddleware.favoriteuuidcheck,controller.addfavorite)
//add friend to user's friendlist
router.post("/:uuid_user/friend/:uuid_friend",userMiddleware.useruuidcheck,userMiddleware.frienduuidcheck,controller.addfriend)
//add game to user's gamelist
router.post("/:uuid_user/game/:uuid_game",userMiddleware.useruuidcheck,gameMiddleware.gameuuidcheck,controller.addgame)
//add room to user's roomlist
router.post("/:uuid_user/room/:uuid_room",userMiddleware.useruuidcheck,roomMiddleware.roomuuidcheck,controller.addroom)
//block user
router.post("/:uuid_user/block/:uuid_blocked",userMiddleware.useruuidcheck,userMiddleware.blockeduuidcheck,controller.blockuser)


router.delete("/:uuid_user",userMiddleware.useruuidcheck,controller.deleteuser)
//remove favorite from user's favoritelist
router.delete("/:uuid_user/favorite/:uuid_friend",userMiddleware.useruuidcheck,userMiddleware.frienduuidcheck,controller.removefavorite)
//remove friend from user's friendlist
router.delete("/:uuid_user/friend/:uuid_friend",userMiddleware.useruuidcheck,userMiddleware.frienduuidcheck,controller.removefriend)
//remove game from user's gamelist
router.delete("/:uuid_user/game/:uuid_game",userMiddleware.useruuidcheck,gameMiddleware.gameuuidcheck,controller.removegame)
//remove room from user's roomlist
router.delete("/:uuid_user/room/:uuid_room",userMiddleware.useruuidcheck,roomMiddleware.roomuuidcheck,controller.removeroom)
//unblock user
router.delete("/:uuid_user/block/:uuid_blocked",userMiddleware.useruuidcheck,userMiddleware.blockeduuidcheck,controller.unblockuser)
