import { deleteallmessageinroom } from "./message.service.js"
import { Room } from "../models/room.model.js"
import { User_Room } from "../models/user_room.model.js"
import dotenv from 'dotenv'
dotenv.config()

const url = `https://${process.env.SERVERHOST}:${process.env.SERVERPORT}`

//?GET

export const getroominfo = async (uuid) => {
    await Room.sync()

    var response = {
        code: 200,
        status: null,
        request: "get room info with given uuid",
        data: []
    }

    const returnData = await Room.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no Room found with the given uuid"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {
            uuid: null,
            title: null,
            room_link: null,
        }

        temp.uuid = returnData[i].uuid
        temp.room_link = `${url}/room/${returnData[i].uuid}`
        temp.title = returnData[i].title
        response.data.push(temp)
    }

    return response
}

export const getroominfodetails = async (uuid) => {
    await Room.sync()

    var response = {
        code: 200,
        status: null,
        request: "get room details with given uuid",
        data: []
    }

    const returnData = await Room.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no Room found with the given uuid"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {
            uuid: null,
            title: null,
            uuid_owner: null,
            created_at: null,
            room_link: null,
            user_link: null,
        }
        temp.uuid = returnData[i].uuid
        temp.title = returnData[i].title
        temp.uuid_owner = returnData[i].uuid_owner
        temp.created_at = returnData[i].created_at
        temp.room_link = `${url}/room/${returnData[i].uuid}`
        temp.user_link = `${url}/user/${returnData[i].uuid_owner}`
        response.data.push(temp)
    }

    return response
}

export const getroomrowner = async (uuid) => {
    await Room.sync()

    var response = {
        code: 200,
        status: null,
        request: "get owner of room with given uuid",
        data: []
    }

    const returnData = await Room.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no Room found with the given uuid"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {
            uuid: null,
            uuid_owner: null,
            room_link: null,
            user_link: null,
        }
        temp.uuid = returnData[i].uuid
        temp.uuid_owner = returnData[i].uuid_owner
        temp.room_link = `${url}/room/${returnData[i].uuid}`
        temp.user_link = `${url}/user/${returnData[i].uuid_owner}`
        response.data.push(temp)
    }

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

    var returnData = await Room.create(room)

    if (returnData.length == 0) {
        response.code = 400
        response.status = "error in given information (uuid_owner is non nullable)"
        return response
    }

    var temp = {uuid: null,uuid_owner: null}
    temp.uuid = returnData.uuid
    temp.uuid_owner = uuid_owner      
    response.data.push(temp)

    returnData = await adduser(returnData.uuid,uuid_owner,"owner")

    return response
}

export const changename = async (uuid,title) => {
    await Room.sync()

    var response = {
        code: 200,
        status: null,
        request: "edit room name",
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

export const adduser = async (uuid_room,uuid_user,rank="member") => {
    await User_Room.sync()

    var response = {
        code: 200,
        status: null,
        request: "add user to a given room",
        data: []
    }

    const link = {
        uuid_room: uuid_room,
        uuid_user: uuid_user,
        rank: rank
    }

    const returnData = await User_Room.create(link).then(function(result){
        return result
    }).catch(function(error){
        return error.original.code
    });

    if (returnData.length == 0) {
        response.code = 400
        response.status = "error in given information (uuid_owner and uuid_user are non nullable)"
        return response
    } else if (returnData == "ER_DUP_ENTRY") {
        response.code = 400
        response.status = "user is already in the given room"
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
        request: "delete room with given uuid",
        data: []
    }

    var returnData = await Room.destroy({where: {uuid: uuid_room}})

    if (returnData == 0) {
        response.code = 400
        response.status = "no room found with the given uuid"
        return response
    }

    await User_Room.sync()

    var returnData = await User_Room.destroy({where: {uuid_room: uuid_room}})

    var returnData = await deleteallmessageinroom(uuid_room)

    return response
}

export const removeuser = async (uuid_room,uuid_user) => {
    await User_Room.sync()

    var response = {
        code: 200,
        status: null,
        request: "remove from room",
        data: []
    }

    const returnData = await User_Room.destroy({where: {uuid_room: uuid_room,uuid_user: uuid_user}})

    if (returnData == 0) {
        response.code = 400
        response.status = "no room found with the given uuid"
        return response
    }

    return response
}
