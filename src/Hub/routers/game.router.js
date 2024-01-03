import express from "express"
import * as controller from '../controllers/game.controller.js'
import * as gameMiddleware from '../middleware/game.middleware.js'

export const router = express.Router()

router.get("/",(req,res) => {
    //TODO: call database to see if its available
    const available = true
    if (available) res.status(200).json({code:200,status:"database is available"})
    res.status(500).json({code:500,status:"database is unavailable at this time"})
})

//get game name, series, studio, platform, genre, wiki
router.get("/:uuid_game",gameMiddleware.gameuuidcheck,controller.getgame)
//get game name, series, studio, platform, genre, wiki, player online, day peak, month peak, alltime peak
router.get("/:uuid_game/details",gameMiddleware.gameuuidcheck,controller.getgamedetails)

//get game uuid, name by name
router.get("/query/name/:name_game",gameMiddleware.namegamecheck,controller.getgamewithname)
//get games uuid, name by studio
router.get("/query/studio/:name_studio",gameMiddleware.namestudiocheck,controller.getgamewithstudio)
//get games uuid, name by genre
router.get("/query/genre/:name_genre",gameMiddleware.namegenrecheck,controller.getgamewithgenre)

//add game using body
router.post("/",gameMiddleware.gamebodycheck,controller.addgame)
//change game info using body
router.post("/:uuid_game",gameMiddleware.gameuuidcheck,controller.modifygame)

//add game using body
router.delete("/:uuid_game",gameMiddleware.gameuuidcheck,controller.deletegame)