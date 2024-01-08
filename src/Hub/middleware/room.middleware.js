import { isUUID } from "../utils/regex.util.js"

export const roomuuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_room)) return res.json({code:400,status:"provided for parameter \"uuid_room\" is not a uuid"})
    next()
}

export const roombodycheck = (req,res,next) => {
    var errorflag = false

    if(!req.body.uuid_user) errorflag = true
    if(!req.body.title) errorflag = true

    if(errorflag) return res.json({code:400,status:"one or more of the given information empty if you do not use a field set it to null"})
    next()
}

export const offsetuuidcheck = (req,res,next) => {
    if(!req.params.depth) return res.json({code:400,status:"provided for parameter \"depth\" is not a uuid"})
    next()
}


export const newnamecheck = (req,res,next) => {
    if(!req.params.new_name) return res.json({code:400,status:"provided for parameter \"new_name\" is not a uuid"})
    next()
}