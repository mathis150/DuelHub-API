import * as service from "../services/message.service.js"

export const getmessage = async (req,res) => {
    res.json(await service.getmessageasync (req.params.uuid_message))
}

export const getmessagedetails = async (req,res) => {
    res.json(await service.getmessagedetailsasync (req.params.uuid_message))
}

export const getmessagreply = async (req,res) => {
    res.json(await service.getreplyasync (req.params.uuid_message))
}

export const addmessage = async (req,res) => {
    res.json(await service.addmessageasync (req.body.uuid_room,req.body.uuid_user,req.body.content,req.body.uuid_reply))
}

export const modifymessage = async (req,res) => {
    res.json(await service.editmessageasync (req.params.uuid_message,req.body.content))
}

export const deletemessage = async (req,res) => {
    res.json(await service.deletemessageasync (req.params.uuid_message))
}