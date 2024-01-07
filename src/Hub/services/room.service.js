import dotenv from 'dotenv'
import { deleteallmessageinroom } from "./message.service.js"
import { Room } from "../models/room.model.js"
import { User_Room } from "../models/user_room.model.js"

dotenv.config()

//?GET

export const getroominfo = async (uuid) => {
    await Room.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Room.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no Room found with the given uuid"
        return response
    }

    returnData.forEach((room) => {
        var temp = {uuid: null,title: null}
        temp.uuid = room.uuid
        temp.title = room.title
        response.data.append(temp)
    })

    return response
}

export const getroominfodetails = async (uuid) => {
    await Room.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Room.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no Room found with the given uuid"
        return response
    }

    returnData.forEach((room) => {
        var temp = {uuid: null,title: null,uuid_owner: null,created_at: null}
        temp.uuid = room.uuid
        temp.title = room.title
        temp.uuid_owner = room.uuid_owner
        temp.created_at = room.created_at
        
        response.data.append(temp)
    })

    return response
}

export const getroomrowner = async (uuid) => {
    await Room.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Room.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no Room found with the given uuid"
        return response
    }

    returnData.forEach((room) => {
        var temp = {uuid: null,uuid_owner: null}
        temp.uuid = room.uuid
        temp.uuid_owner = room.uuid_owner        
        response.data.append(temp)
    })

    return response
}

//?POST

export const createroom = async (uuid_owner,title="New room") => {
    await Room.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const room = {
        uuid_owner: uuid_owner,
        title: title
    }

    const returnData = await Room.create(room)

    if (returnData.length == 0) {
        response.code = 400
        response.status = "error in given information (uuid_owner is non nullable)"
        return response
    }

    return response
}

export const changename = async (uuid,title) => {
    await Room.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Room.update({title: title},{where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "error in given information (uuid_owner is non nullable)"
        return response
    }

    return response
}

export const adduser = async (uuid_room,uuid_user) => {
    await User_Room.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const link = {
        uuid_room: uuid_room,
        uuid_user: uuid_user
    }

    const returnData = await User_Room.create(link)

    if (returnData.length == 0) {
        response.code = 400
        response.status = "error in given information (uuid_owner and uuid_user are non nullable)"
        return response
    }

    return response
}

//?DELETE

export const deleteroom = async (uuid_room) => {
    await Room.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    var returnData = await Room.destroy({where: {uuid_room: uuid_room}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no room found with the given uuid"
        return response
    }

    await User_Room.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    var returnData = await User_Room.destroy({where: {uuid_room: uuid_room}})

    var returnData = await deleteallmessageinroom(uuid_room)

    return response
}

export const removeuser = async (uuid_room,uuid_user) => {
    await User_Room.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await User_Room.destroy({where: {uuid_room: uuid_room,uuid_user: uuid_user}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no room found with the given uuid"
        return response
    }

    return response
}
