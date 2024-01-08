import { Message } from "../models/message.model.js"
import dotenv from 'dotenv'
dotenv.config()

//?GET

export const getmessage = async (uuid) => {
    await Message.sync()

    var response = {
        code: 200,
        status: null,
        request: "get message with given uuid",
        data: []
    }

    const returnData = await Message.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no message found with the given uuid"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,content: null}
        temp.uuid = returnData[i].uuid
        temp.content = returnData[i].content
        response.data.push(temp)
    }

    return response
}

export const getmessagedetails = async (uuid) => {
    await Message.sync()

    var response = {
        code: 200,
        status: null,
        request: "get message details with given uuid",
        data: []
    }

    const returnData = await Message.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no message found with the given uuid"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,uuid_room: null,uuid_user: null,content: null,uuid_reply: null,published: null}
        temp.uuid = returnData[i].uuid
        temp.uuid_room = returnData[i].uuid_room
        temp.uuid_user = returnData[i].uuid_user
        temp.content = returnData[i].content
        temp.uuid_reply = returnData[i].uuid_reply
        temp.published = returnData[i].published
        response.data.push(temp)
    }

    return response
}

export const getreply = async (uuid) => {
    await Message.sync()

    var response = {
        code: 200,
        status: null,
        request: "get message being replied to by the message from the given uuid",
        data: []
    }

    const returnData = await Message.findAll({where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no message found with the given uuid"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        if (returnData[i].uuid_reply === null) {
            response.code = 400
            response.status = "message is not a reply"
            return
        }

        var temp = {uuid: null,content: null}
        temp.uuid = returnData[i].uuid_reply

        const replydata = await Message.findAll({where: {uuid: uuid_reply}})

        if (replydata.length == 0) {
            response.code = 404
            response.status = "the message being replyed to is not available"
            response.data.push(temp)
            return
        }

        temp.content = replydata[0].content
        response.data.push(temp)
    }

    return response
}

export const getroomfeed = async (uuid_room,start = 0) => {
    await Message.sync()

    var response = {
        code: 200,
        status: null,
        request: `get room feed with offset ${start}`,
        data: []
    }

    const returnData = await Message.findAll({where: {uuid_room: uuid_room},offset: start})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no message found with the given room"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,content: null}
        temp.uuid = returnData[i].uuid
        temp.content = returnData[i].content
        response.data.push(temp)
    }

    return response
}

export const getuserfeed = async (uuid_room,uuid_user,start = 0) => {
    await Message.sync()

    var response = {
        code: 200,
        status: null,
        request: `get user feed with offset ${start}`,
        data: []
    }

    const returnData = await Message.findAll({where: {uuid_room: uuid_room,uuid_user: uuid_user,},offset: start})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "the given user didnt post anything in this room"
        return response
    }

    for(let i = 0; i < returnData.length; i++) {
        var temp = {uuid: null,content: null}
        temp.uuid = returnData[i].uuid
        temp.content = returnData[i].content
        response.data.push(temp)
    }

    return response
}

//?POST

export const addmessage = async (uuid_room,uuid_user,content,uuid_reply=null) => {
    await Message.sync()

    var response = {
        code: 200,
        status: null,
        request: "add message with room uuid, user uuid, content and optional reply uuid",
        data: []
    }

    const message = {
        uuid_room: uuid_room,
        uuid_user: uuid_user,
        content: content,
        uuid_reply: uuid_reply
    }

    const returnData = await Message.create(message)

    if (returnData.length == 0) {
        response.code = 400
        response.status = "error in given information (uuid_room,uuid_user and content are non nullable)"
        return response
    }

    return response
}

export const editmessage = async (uuid,content) => {
    await Message.sync()

    var response = {
        code: 200,
        status: null,
        request: "edit content of message with given uuid",
        data: []
    }

    const returnData = await Message.update({content: content},{where: {uuid: uuid}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no message found with the given uuid"
        return response
    }

    return response
}

//?DELETE

export const deletemessage = async (uuid) => {
    await Message.sync()

    var response = {
        code: 200,
        status: null,
        request: "delete message with given uuid",
    }

    const returnData = await Message.destroy({where: {uuid: uuid}})

    if (returnData == 0) {
        response.code = 400
        response.status = "no message found with the given uuid"
        return response
    }

    return response
}

export const removeallusermessageinroom = async (uuid_room,uuid_user) => {
    await Message.sync()

    var response = {
        code: 200,
        status: null,
        request: "delete all message of a user a room",
    }

    const returnData = await Message.destroy({where: {uuid_room: uuid_room,uuid_user: uuid_user}})

    if (returnData == 0) {
        response.code = 400
        response.status = "no message found by this user in the given room"
        return response
    }

    return response
}

export const deleteallmessageinroom = async (uuid_room) => {
    await Message.sync()

    var response = {
        code: 200,
        status: null,
        request: "delete all message in a room",
    }

    const returnData = await Message.destroy({where: {uuid_room: uuid_room}})

    if (returnData == 0) {
        response.code = 400
        response.status = "no message found in the given room"
        return response
    }

    return response
}

export const deleteallusermessage = async (uuid_user) => {
    await Message.sync()

    var response = {
        code: 200,
        status: null,
        request: "delete all message from a user",
    }

    const returnData = await Message.destroy({where: {uuid_user: uuid_user}})

    if (returnData == 0) {
        response.code = 400
        response.status = "no message found by the given user"
        return response
    }

    return response
}