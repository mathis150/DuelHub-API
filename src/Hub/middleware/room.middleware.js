import { isUUID } from "../utils/uuid.utils.js"

export const roomuuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_room)) next({code:400,status:"provided for parameter \"uuid_room\" is not a uuid"})
    next()
}

export const roombodycheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_room)) next({code:400,status:"provided for parameter \"uuid_room\" is not a uuid"})
    next()
}

export const depthuuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_depth)) next({code:400,status:"provided for parameter \"uuid_room\" is not a uuid"})
    next()
}

export const newnamecheck = (req,res,next) => {
    if(!isUUID(req.params.new_name)) next({code:400,status:"provided for parameter \"uuid_room\" is not a uuid"})
    next()
}