import { isUUID } from "../utils/regex.util.js"

export const messageuuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_message)) res.json({code:400,status:"provided for parameter \"uuid_message\" is not a uuid"})
    next()
}

export const messagebodycheck = (req,res,next) =>  {
    var errorflag = false

    if(!req.body.uuid_room) errorflag = true
    if(!req.body.uuid_user) errorflag = true
    if(!req.body.content) errorflag = true
    if(!req.body.uuid_reply) errorflag = true

    if(errorflag) res.json({code:400,status:"one or more of the given information empty if you do not use a field set it to null"})
    next()
}