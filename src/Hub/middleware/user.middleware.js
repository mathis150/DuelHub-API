import { isUUID } from "../utils/uuid.utils.js"

export const useruuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_user)) next({code:400,status:"provided for parameter \"uuid_user\" is not a uuid"})
    next()
}

export const frienduuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_friend)) next({code:400,status:"provided for parameter \"uuid_friend\" is not a uuid"})
    next()
}

export const favoriteuuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_favorite)) next({code:400,status:"provided for parameter \"uuid_favorite\" is not a uuid"})
    next()
}
