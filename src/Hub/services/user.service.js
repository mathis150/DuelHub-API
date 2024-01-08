import dotenv from 'dotenv'
import { getgame } from "./game.service.js"
import { getroominfo } from "./room.service.js"
import { deleteallusermessage } from "./message.service.js"

import { User } from "../models/user.model.js"
import { Relation } from "../models/user_relation.model.js"
import { User_Room } from "../models/user_room.model.js"
import { User_Game } from "../models/user_game.model.js"

dotenv.config()

//?GET

export const getuser = async (uuid) => {
    await User.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await User.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no User found with the given uuid"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,username: null}
        temp.uuid = returnData[i].uuid
        temp.username = returnData[i].username
        response.data.push(temp)
    }

    return response
}

export const getuserdetails = async (uuid) => {
    await User.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await User.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no User found with the given uuid"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,username: null,last_connection: null,first_connection: null}
        temp.uuid = returnData[i].uuid
        temp.username = returnData[i].username
        temp.last_connection = returnData[i].last_connection
        temp.first_connection = returnData[i].first_connection
        response.data.push(temp)
    }

    return response
}

export const getuserbyusername = async (username) => {
    await User.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await User.findAll({where: {username: username}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no User found with the given uuid"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,username: null}
        temp.uuid = returnData[i].uuid
        temp.username = returnData[i].username
        response.data.push(temp)
    }

    return response
}

export const getuserfriendlist = async (uuid,start=0) => {
    await Relation.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    var returnData = await Relation.findAll({where: {uuid_user_primary: uuid,relation: "friend"},offset: start})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no User found with the given uuid"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,username: null}
        temp.uuid = returnData[i].uuid_user_secondary

        var tempReturnData = await User.findAll({where: {uuid: returnData[i].uuid_user_secondary}})
        temp.username = tempReturnData.data[0].username
        response.data.push(temp)
    }

    return response
}

export const getuserfavoritelist = async (uuid,start=0) => {
    await Relation.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    var returnData = await Relation.findAll({where: {uuid_user_primary: uuid,relation: "favorite"},offset: start})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no User found with the given uuid"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,username: null}
        temp.uuid = returnData[i].uuid_user_secondary

        var tempReturnData = await User.findAll({where: {uuid: returnData[i].uuid_user_secondary}})
        temp.username = tempReturnData.data[0].username
        response.data.push(temp)
    }

    return response
}

export const getusergamelist = async (uuid,start=0) => {
    await User_Game.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    var returnData = await User_Game.findAll({where: {uuid_user: uuid},offset: start})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "User does not have any games"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,title: null}
        temp.uuid = returnData[i].uuid_game

        var tempReturnData = await getroominfo(returnData[i].uuid_game)
        temp.title = tempReturnData.data[0].title
        response.data.push(temp)
    }

    return response
}

export const getuserroomlist = async (uuid,start=0) => {
    await User_Room.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    var returnData = await User_Room.findAll({where: {uuid_user: uuid},offset: start})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "User is not a member of any room"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,title: null}
        temp.uuid = returnData[i].uuid_room

        var tempReturnData = await getroominfo(returnData[i].uuid_room)
        temp.title = tempReturnData.data[0].title
        response.data.push(temp)
    }

    return response
}

//?POST

export const addfriend = async (uuid_user,uuid_friend) => {
    await Relation.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const user_relation = {
        uuid_user_primary: uuid_user,
        uuid_user_secondary: uuid_friend,
        relation: "friend"
    }

    const returnData = await Relation.create(user_relation)

    if (returnData.length == 0) {
        response.code = 400
        response.status = "error in given information (uuid_user and uuid_friend is non nullable)"
        return response
    }

    return response
}

export const addfavorite = async (uuid_user,uuid_favorite) => {
    await Relation.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const user_relation = {
        uuid_user_primary: uuid_user,
        uuid_user_secondary: uuid_favorite,
        relation: "favorite"
    }

    const returnData = await Relation.create(user_relation)

    if (returnData.length == 0) {
        response.code = 400
        response.status = "error in given information (uuid_user and uuid_favorite is non nullable)"
        return response
    }

    return response
}

export const addgame = async (uuid_user,uuid_game) => {
    await User_Game.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const user_game = {
        uuid_user: uuid_user,
        uuid_game: uuid_game,
    }

    const returnData = await User_Game.create(user_game)

    if (returnData.length == 0) {
        response.code = 400
        response.status = "error in given information (uuid_user and uuid_game is non nullable)"
        return response
    }

    return response
}

export const addroom = async (uuid_user,uuid_room) => {
    await User_Room.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const user_game = {
        uuid_user: uuid_user,
        uuid_room: uuid_room,
    }

    const returnData = await User_Room.create(user_game)

    if (returnData.length == 0) {
        response.code = 400
        response.status = "error in given information (uuid_user and uuid_room is non nullable)"
        return response
    }

    return response
}

export const blockuser = async (uuid_user,uuid_blocked) => {
    await Relation.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const user_relation = {
        uuid_user_primary: uuid_user,
        uuid_user_secondary: uuid_blocked,
        relation: "blocked"
    }

    const returnData = await Relation.create(user_relation)

    if (returnData.length == 0) {
        response.code = 400
        response.status = "error in given information (uuid_user and uuid_blocked is non nullable)"
        return response
    }

    return response
}

export const confirmuseremail = async (uuid) => {
    await User.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await User.update({confirmed: true},{where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "could not confirm user address as user could not be found"
        return response
    }

    return response
}


//?DELETE

export const deleteuser = async (uuid) => {
    await User.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    var returnData = await User.destroy({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no user found with the given uuid"
        return response
    }

    var returnData = deleteallusermessage(uuid)

    return response
}

export const removefriend = async (uuid_user,uuid_friend) => {
    await Relation.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    var returnData = await Relation.destroy({where: {uuid_user_primary: uuid_user,uuid_user_secondary: uuid_friend,relation:"friend"}})
    var returnData = await Relation.destroy({where: {uuid_user_primary: uuid_friend,uuid_user_secondary: uuid_user,relation:"friend"}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "the specified user are not friends"
        return response
    }

    return response
}

export const removefavorite = async (uuid_user,uuid_favorite) => {
    await Relation.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    var returnData = await Relation.destroy({where: {uuid_user_primary: uuid_user,uuid_user_secondary: uuid_favorite,relation:"favorite"}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "the specified user are not favorites"
        return response
    }

    return response
}

export const removegame = async (uuid_user,uuid_game) => {
    await User_Game.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }
    
    var returnData = await User_Game.destroy({where: {uuid_game: uuid_game,uuid_user: uuid_user}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "the user does not have this game; Or game or user dosnt exist"
        return response
    }

    return response
}

export const removeroom = async (uuid_user,uuid_room) => {
    await User_Room.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    var returnData = await User_Room.destroy({where: {uuid_room: uuid_room,uuid_user: uuid_user}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "the user is not in this room; Or room or user dosnt exist"
        return response
    }

    return response
}

export const unblockuser = async (uuid_user,uuid_blocked) => {
    await Relation.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    var returnData = await Relation.destroy({where: {uuid_user_primary: uuid_user,uuid_user_secondary: uuid_blocked,relation:"blocked"}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "the specified user are not favorites"
        return response
    }

    return response
}

