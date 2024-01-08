import * as service from "../services/message.service.js"

export const getmessage = async (req,res) => {
    res.json(await service.getmessage(req.params.uuid_message))
}

export const getmessagedetails = async (req,res) => {
    res.json(await service.getmessagedetails(req.params.uuid_message))
}

export const getmessagreply = async (req,res) => {
    res.json(await service.getreply(req.params.uuid_message))
}

export const addmessage = async (req,res) => {
    res.json(await service.addmessage(req.body.uuid_room,req.body.uuid_user,req.body.content,req.body.uuid_reply))
}

export const modifymessage = async (req,res) => {
    res.json(await service.editmessage(req.params.uuid_message,req.body.content))
}

export const deletemessage = async (req,res) => {
    res.json(await service.deletemessage(req.params.uuid_message))
}