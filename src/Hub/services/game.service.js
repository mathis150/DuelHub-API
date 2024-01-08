import { Game } from '../models/game.model.js'
import dotenv from 'dotenv'
dotenv.config()

//?GET

export const getgame = async (uuid) => {
    await Game.sync()

    var response = {
        code: 200,
        status: null,
        request: "return game info with the given uuid",
        data: []
    }

    const returnData = await Game.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no game found with the given uuid"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,title: null}
        temp.uuid = returnData[i].uuid
        temp.title = returnData[i].title
        response.data.push(temp)
    }

    return response
}

export const getgamedetails = async (uuid) => {
    await Game.sync()

    var response = {
        code: 200,
        status: null,
        request: "return game info with the given uuid",
        data: []
    }

    const returnData = await Game.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no game found with the given uuid"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,title: null,series: null,studio: null,desc: null,published: null}
        temp.uuid = returnData[i].uuid
        temp.title = returnData[i].title
        temp.series = returnData[i].series
        temp.studio = returnData[i].studio
        temp.desc = returnData[i].desc
        temp.published = returnData[i].published
        response.data.push(temp)
    }

    return response
}

export const querywithname = async (name) => {
    await Game.sync()

    var response = {
        code: 200,
        status: null,
        request: "find game with given username",
        data: []
    }

    const returnData = await Game.findAll({where: {title: name}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no game found with the given name"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,title: null}
        temp.uuid = gamereturnData[i].uuid
        temp.title = gamereturnData[i].title
        response.data.push(temp)
    }

    return response
}

export const querywithstudio = async (studio) => {
    await Game.sync()

    var response = {
        code: 200,
        status: null,
        request: "find game with the given studio",
        data: []
    }

    const returnData = await Game.findAll({where: {studio: studio}})

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,title: null}
        temp.uuid = returnData[i].uuid
        temp.title = returnData[i].title
        response.data.push(temp)
    }

    return response
}

export const querywithgenre = async (genre) => {
    await Game.sync()

    var response = {
        code: 200,
        status: null,
        request: "find game with the given genre",
        data: []
    }

    const returnData = await Game.findAll({where: {genre: genre}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no game found with the given genre"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,title: null}
        temp.uuid = returnData[i].uuid
        temp.title = returnData[i].title
        response.data.push(temp)
    }

    return response
}

//?POST

export const addgame = async (title,series=null,studio=null,genre=null,desc=null,published=null) => {
    var Game = {
        code: 200,
        status: null,
        request: "add game with the given title, series, studio, genre, desc and publish date (unused field must be null)",
    }

    var game = {
        title: title,
        series: series,
        studio: studio,
        genre: genre,
        desc: desc,
        published: published
    }

    const returnData = await Game.create(game)

    if (returnData.length == 0) {
        response.code = 400
        response.status = "error in given information (title might is non nullable)"
        return response
    }

    return response
}

export const changeinfo = async (uuid,title=null,series=null,studio=null,genre=null,desc=null,published=null) => {
    var Game = {
        code: 200,
        status: null,
        request: "change game info",
    }

    var returnData = await Game.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no game found with the given uuid"
        return response
    }

    returnData.forEach((game) => {
        title = title || game.title
        series = series || game.series
        studio = studio || game.studio
        genre = genre || game.genre
        desc = desc || game.desc
        published = published || game.published
    })
    
    returnData = Game.update({title: title, series: series, studio: studio, genre: genre, desc: desc, published: published},{where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no game found with the given uuid"
        return response
    }

    return response
}

//?DELETE

export const deletegame = async (uuid) => {
    var Game = {
        code: 200,
        status: null,
        request: "delete game with the given uuid",
    }

    const returnData = await Game.destroy({where: {uuid: uuid}})

    if (returnData == 0) {
        response.code = 400
        response.status = "no game found with the given uuid"
        return response
    }

    return response
}