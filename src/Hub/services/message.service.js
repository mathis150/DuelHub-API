import Sequelize, { where } from "sequelize"
import dotenv from 'dotenv'
import { Message } from "../models/message.model.js"

dotenv.config()

var sequelize = new Sequelize(
    process.env.DATABASE_CONV,
    process.env.SQL_USER,
    process.env.SQL_PASSWORD,
    {host: process.env.SQL_HOST, dialect: 'mysql'})

//?GET

export const getmessage = async (uuid) => {
    await sequelize.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Message.findAll({where: {uuid: uuid}, limit: process.env.SQL_LIMIT})

    if (!(returnData instanceof Message)) {
        response.code = 400
        response.status = "no message found with the given uuid"
        return response
    }

    returnData.forEach((message) => {
        var temp = {uuid: null,content: null}
        temp.uuid = message.uuid
        temp.content = message.content
        response.data.append(temp)
    })

    return response
}

export const getmessagedetails = async (uuid) => {
    await sequelize.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Message.findAll({where: {uuid: uuid}, limit: process.env.SQL_LIMIT})

    if (!(returnData instanceof Message)) {
        response.code = 400
        response.status = "no message found with the given uuid"
        return response
    }

    returnData.forEach((message) => {
        var temp = {uuid: null,uuid_room: null,uuid_user: null,content: null,uuid_reply: null,published: null}
        temp.uuid = message.uuid
        temp.uuid_room = message.uuid_room
        temp.uuid_user = message.uuid_user
        temp.content = message.content
        temp.uuid_reply = message.uuid_reply
        temp.published = message.published
        response.data.append(temp)
    })

    return response
}

export const getreply = async (uuid) => {
    await sequelize.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Message.findAll({where: {uuid: uuid}, limit: process.env.SQL_LIMIT})

    if (!(returnData instanceof Message)) {
        response.code = 400
        response.status = "no message found with the given uuid"
        return response
    }

    returnData.forEach(async (message) => {
        if (message.uuid_reply === null) {
            response.code = 400
            response.status = "message is not a reply"
            return
        }

        var temp = {uuid: null,content: null}
        temp.uuid = message.uuid_reply

        const replydata = await Message.findAll({where: {uuid: uuid_reply}, limit: process.env.SQL_LIMIT})

        if (!(returnData instanceof Message)) {
            response.code = 404
            response.status = "the message being replyed to is not available"
            response.data.append(temp)
            return
        }

        temp.content = replydata[0].content
        response.data.append(temp)
    })

    return response
}

export const getroomfeed = async (uuid_room,start = 0) => {
    await sequelize.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Message.findAll({where: {uuid_room: uuid_room},offset: start, limit: process.env.SQL_LIMIT})

    if (!(returnData instanceof Message)) {
        response.code = 400
        response.status = "no message found with the given room"
        return response
    }

    returnData.forEach((message) => {
        var temp = {uuid: null,content: null}
        temp.uuid = message.uuid
        temp.content = message.content
        response.data.append(temp)
    })

    return response
}

export const getuserfeed = async (uuid_room,uuid_user,start = 0) => {
    await sequelize.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Message.findAll({where: {uuid_room: uuid_room,uuid_user: uuid_user,},offset: start, limit: process.env.SQL_LIMIT})

    if (!(returnData instanceof Message)) {
        response.code = 400
        response.status = "the given user didnt post anything in this room"
        return response
    }

    returnData.forEach((message) => {
        var temp = {uuid: null,content: null}
        temp.uuid = message.uuid
        temp.content = message.content
        response.data.append(temp)
    })

    return response
}

//?POST

export const addmessage = async (uuid_room,uuid_user,content,uuid_reply=null) => {
    await sequelize.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const message = {
        uuid_room: uuid_room,
        uuid_user: uuid_user,
        content: content,
        uuid_reply: uuid_reply
    }

    const returnData = await Message.create(message)

    if (!(returnData instanceof Message)) {
        response.code = 400
        response.status = "error in given information (uuid_room,uuid_user and content are non nullable)"
        return response
    }

    return response
}

export const editmessage = async (uuid,content) => {
    await sequelize.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

    const returnData = await Message.update({content: content},{where: {uuid: uuid}})

    if (!(returnData instanceof Message)) {
        response.code = 400
        response.status = "no message found with the given uuid"
        return response
    }

    return response
}

//?DELETE

export const deletemessage = async (uuid) => {
    await sequelize.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
    }

    const returnData = await Message.destroy({where: {uuid: uuid}})

    if (!(returnData instanceof Message)) {
        response.code = 400
        response.status = "no message found with the given uuid"
        return response
    }

    return response
}

export const removeallusermessageinroom = async (uuid_room,uuid_user) => {
    await sequelize.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
    }

    const returnData = await Message.destroy({where: {uuid_room: uuid_room,uuid_user: uuid_user}})

    if (!(returnData instanceof Message)) {
        response.code = 400
        response.status = "no message found by this user in the given room"
        return response
    }

    return response
}

export const deleteallmessageinroom = async (uuid_room) => {
    await sequelize.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
    }

    const returnData = await Message.destroy({where: {uuid_room: uuid_room}})

    if (!(returnData instanceof Message)) {
        response.code = 400
        response.status = "no message found in the given room"
        return response
    }

    return response
}

export const deleteallusermessage = async (uuid_user) => {
    await sequelize.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
    }

    const returnData = await Message.destroy({where: {uuid_user: uuid_user}})

    if (!(returnData instanceof Message)) {
        response.code = 400
        response.status = "no message found by the given user"
        return response
    }

    return response
}