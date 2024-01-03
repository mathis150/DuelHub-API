import * as service from "../services/game.service.js"

export const getgame = (req,res) => {
    res.json(service.getgame(req.params.uuid_game))
}

export const getgamedetails = (req,res) => {
    res.json(service.getgamedetails(req.params.uuid_game))
}

export const getgamewithname = (req,res) => {
    res.json(service.querywithname(req.params.name_game))
}

export const getgamewithstudio = (req,res) => {
    res.json(service.querywithstudio(req.params.name_studio))
}

export const getgamewithgenre = (req,res) => {
    res.json(service.querywithgenre(req.body.name_genre))
}

export const addgame = (req,res) => {
    res.json(service.addgame(req.body.title,req.body.series,req.body.studio,req.body.genre,req.body.desc,req.body.published))
}

export const modifygame = (req,res) => {
    res.json(service.changeinfo(req.params.uuid_game,req.body.title,req.body.series,req.body.studio,req.body.genre,req.body.desc,req.body.published))
}

export const deletegame = (req,res) => {
    res.json(service.deletegame(req.params.uuid_game))
}