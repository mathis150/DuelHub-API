import express from "express"
import { htmlError } from "../../errorhandler.utils.js"
import * as controller from '../controllers/user.controller.js'
import * as middleware from '../middleware/user.middleware.js'

export const userrouter = express.Router()

userrouter.get("/",(req,res) => {
    //TODO: call database to see if its available
    const available = true
    if (available) res.status(200).json(htmlError(200,"database is available"))
    res.status(500).json(htmlError(500,"database is unavailable at this time"))
})

userrouter.get("/",(req,res) => {
    res.status(500).json({code:500,message:"test"})
})

//get user uuid, username , rank
userrouter.get("/:uuid_user",middleware.useruuidcheck,controller.get_userinfo)
//get user uuid, basename, username, rank, email, friends_uuid, favorite_uuid, games_uuid
userrouter.get("/:uuid_user/details",middleware.useruuidcheck,controller.get_useradvancedinfo)

//get user uuid, username, friends_uuid
userrouter.get("/:uuid_user/friendlist",middleware.useruuidcheck,controller.get_friendlist)
//get user uuid, username, same for all friends
userrouter.get("/:uuid_user/friendlist/details",middleware.useruuidcheck,controller.get_friendlistdetails)

//get user uuid, username, favorite_uuid
userrouter.get("/:uuid_user/favoritelist",middleware.useruuidcheck,controller.get_favoritelist)
//get user uuid, username, same for all favorites
userrouter.get("/:uuid_user/favoritelist/details",middleware.useruuidcheck,controller.get_favoritelistdetails)

//get user uuid, username, games_uuid
userrouter.get("/:uuid_user/gamelist",middleware.useruuidcheck,controller.get_gamelist)
//get user uuid, username, games_info
userrouter.get("/:uuid_user/gamelist/details",middleware.useruuidcheck,controller.get_gamelistdetails)

//get user rooms
userrouter.get("/:uuid_user/room",middleware.useruuidcheck,controller.get_roomlist)


//add favorite to user's favoritelist
userrouter.post("/:uuid_user/favorite/:uuid_friend",middleware.useruuidcheck,middleware.favoriteuuidcheck,controller.post_addfavorite)
//add friend to user's friendlist
userrouter.post("/:uuid_user/friend/:uuid_friend",middleware.useruuidcheck,middleware.frienduuidcheck,controller.post_addfriend)
//add game to user's gamelist
userrouter.post("/:uuid_user/game/:uuid_game",middleware.useruuidcheck,middleware.gameuuidcheck,controller.post_addgame)
//add room to user's roomlist
userrouter.post("/:uuid_user/room/:uuid_room",middleware.useruuidcheck,middleware.roomuuidcheck,controller.post_addroom)


//add favorite to user's favoritelist
userrouter.delete("/:uuid_user/favorite/:uuid_friend",middleware.useruuidcheck,middleware.favoriteuuidcheck,controller.delete_removefavorite)
//add friend to user's friendlist
userrouter.delete("/:uuid_user/friend/:uuid_friend",middleware.useruuidcheck,middleware.frienduuidcheck,controller.delete_removefriend)
//add game to user's gamelist
userrouter.delete("/:uuid_user/game/:uuid_game",middleware.useruuidcheck,middleware.gameuuidcheck,controller.delete_removegame)
//add room to user's roomlist
userrouter.delete("/:uuid_user/room/:uuid_room",middleware.useruuidcheck,middleware.roomuuidcheck,controller.delete_removeroom)