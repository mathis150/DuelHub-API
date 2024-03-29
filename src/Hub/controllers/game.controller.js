import * as service from "../services/game.service.js"

export const getgame = async (req,res) => {
    res.json(await service.getgame(req.params.uuid_game))
}

export const getgamedetails = async (req,res) => {
    res.json(await service.getgamedetails(req.params.uuid_game))
}

export const getgamewithname = async (req,res) => {
    res.json(await service.querywithname(req.params.name_game))
}

export const getgamewithstudio = async (req,res) => {
    res.json(await service.querywithstudio(req.params.name_studio))
}

export const getgamewithgenre = async (req,res) => {
    res.json(await service.querywithgenre(req.body.name_genre))
}

export const addgame = async (req,res) => {
    res.json(await service.addgame(req.body.title,req.body.series,req.body.studio,req.body.genre,req.body.desc,req.body.published))
}

export const modifygame = async (req,res) => {
    res.json(await service.changeinfo(req.params.uuid_game,req.body.title,req.body.series,req.body.studio,req.body.genre,req.body.desc,req.body.published))
}

export const deletegame = async (req,res) => {
    res.json(await service.deletegame(req.params.uuid_game))
}