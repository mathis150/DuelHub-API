import * as service from "../services/message.service.js"

export const getmessage = (req,res) => {
    res.json(service.getmessage(req.params.uuid_message))
}

export const getmessagedetails = (req,res) => {
    res.json(service.getmessagedetails(req.params.uuid_message))
}

export const getmessagreply = (req,res) => {
    res.json(service.getreply(req.params.uuid_message))
}

export const addmessage = (req,res) => {
    res.json(service.addmessage(req.body.uuid_room,req.body.uuid_user,req.body.content,req.body.uuid_reply))
}

export const modifymessage = (req,res) => {
    res.json(service.editmessage(req.params.uuid_message,req.body.content))
}

export const deletemessage = (req,res) => {
    res.json(service.deletemessage(req.params.uuid_message))
}