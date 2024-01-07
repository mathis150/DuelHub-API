import dotenv from 'dotenv'

import { Game } from '../models/game.model.js'

dotenv.config()

//?GET

export const getgame = async (uuid) => {
    await Game.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Game.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no game found with the given uuid"
        return response
    }

    returnData.forEach((game) => {
        var temp = {uuid: null,title: null}
        temp.uuid = game.uuid
        temp.title = game.title
        response.data.append(temp)
    })

    return response
}

export const getgamedetails = async (uuid) => {
    await Game.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Game.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no game found with the given uuid"
        return response
    }

    returnData.forEach((game) => {
        var temp = {uuid: null,title: null,series: null,studio: null,desc: null,published: null}
        temp.uuid = game.uuid
        temp.title = game.title
        temp.series = game.series
        temp.studio = game.studio
        temp.desc = game.desc
        temp.published = game.published
        response.data.append(temp)
    })

    return response
}

export const querywithname = async (name) => {
    await Game.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Game.findAll({where: {title: name}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no game found with the given name"
        return response
    }

    returnData.forEach((game) => {
        var temp = {uuid: null,title: null}
        temp.uuid = game.uuid
        temp.title = game.title
        response.data.append(temp)
    })

    return response
}

export const querywithstudio = async (studio) => {
    await Game.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Game.findAll({where: {studio: studio}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no game found with the given studio"
        return response
    }

    returnData.forEach((game) => {
        var temp = {uuid: null,title: null}
        temp.uuid = game.uuid
        temp.title = game.title
        response.data.append(temp)
    })

    return response
}

export const querywithgenre = async (genre) => {
    await Game.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Game.findAll({where: {genre: genre}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no game found with the given genre"
        return response
    }

    returnData.forEach((game) => {
        var temp = {uuid: null,title: null}
        temp.uuid = game.uuid
        temp.title = game.title
        response.data.append(temp)
    })

    return response
}

//?POST

export const addgame = async (title,series=null,studio=null,genre=null,desc=null,published=null) => {
    var Game = {
        code: 200,
        status: null,
        request: null,
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
        request: null,
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
        request: null,
    }

    const returnData = await Game.destroy({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no game found with the given uuid"
        return response
    }

    return response
}