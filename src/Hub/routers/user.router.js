import express from "express"
import * as controller from '../controllers/user.controller.js'
import * as userMiddleware from '../middleware/user.middleware.js'
import * as roomMiddleware from '../middleware/room.middleware.js'
import * as gameMiddleware from '../middleware/game.middleware.js'

export const router = express.Router()

router.get("/",(req,res) => {
    //TODO: call database to see if its available
    const available = true
    if (available) res.status(200).json({code:200,status:"database is available"})
    res.status(500).json({code:500,status:"database is unavailable at this time"})
})

//get user uuid, username , rank
router.get("/:uuid_user",userMiddleware.useruuidcheck)
//get user uuid, basename, username, rank, email, friends_uuid, favorite_uuid, games_uuid
router.get("/:uuid_user/details",userMiddleware.useruuidcheck)

//get user uuid, username, friends_uuid
router.get("/:uuid_user/friendlist",userMiddleware.useruuidcheck)
//get user details of specified friend
router.get("/:uuid_user/friendlist/*",userMiddleware.useruuidcheck)

//get user uuid, username, favorite_uuid
router.get("/:uuid_user/favoritelist",userMiddleware.useruuidcheck)
//reroute to user router
router.get("/:uuid_user/favoritelist/*",userMiddleware.useruuidcheck)

//get user's gamelist
router.get("/:uuid_user/gamelist",userMiddleware.useruuidcheck)
//reroute to game router
router.get("/:uuid_user/gamelist/*",userMiddleware.useruuidcheck)

//get user rooms
router.get("/:uuid_user/room",userMiddleware.useruuidcheck)
//reroute to room router
router.get("/:uuid_user/room/*",userMiddleware.useruuidcheck)


//add favorite to user's favoritelist
router.post("/:uuid_user/favorite/:uuid_favorite",userMiddleware.useruuidcheck,userMiddleware.favoriteuuidcheck)
//add friend to user's friendlist
router.post("/:uuid_user/friend/:uuid_friend",userMiddleware.useruuidcheck,userMiddleware.frienduuidcheck)
//add game to user's gamelist
router.post("/:uuid_user/game/:uuid_game",userMiddleware.useruuidcheck,gameMiddleware.gameuuidcheck)
//add room to user's roomlist
router.post("/:uuid_user/room/:uuid_room",userMiddleware.useruuidcheck,roomMiddleware.roomuuidcheck)

//remove favorite from user's favoritelist
router.delete("/:uuid_user/favorite/:uuid_friend",userMiddleware.useruuidcheck,userMiddleware.frienduuidcheck)
//remove friend from user's friendlist
router.delete("/:uuid_user/friend/:uuid_friend",userMiddleware.useruuidcheck,userMiddleware.frienduuidcheck)
//remove game from user's gamelist
router.delete("/:uuid_user/game/:uuid_game",userMiddleware.useruuidcheck,gameMiddleware.gameuuidcheck)
//remove room from user's roomlist
router.delete("/:uuid_user/room/:uuid_room",userMiddleware.useruuidcheck,roomMiddleware.roomuuidcheck)