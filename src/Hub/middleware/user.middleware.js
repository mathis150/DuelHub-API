import { isUUID } from "../utils/regex.util.js"

export const useruuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_user)) return res.json({code:400,status:"provided for parameter \"uuid_user\" is not a uuid"})
    next()
}

export const usernamecheck = (req,res,next) => {
    if(!req.params.username) return res.json({code:400,status:"provided for parameter \"username\" is not a uuid"})
    next()
}

export const frienduuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_friend)) return res.json({code:400,status:"provided for parameter \"uuid_friend\" is not a uuid"})
    next()
}

export const favoriteuuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_favorite)) return res.json({code:400,status:"provided for parameter \"uuid_favorite\" is not a uuid"})
    next()
}

export const blockeduuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_blocked)) return res.json({code:400,status:"provided for parameter \"uuid_blocked\" is not a uuid"})
    next()
}