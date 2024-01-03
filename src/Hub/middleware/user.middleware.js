import { isUUID } from "../utils/regex.util.js"

export const useruuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_user)) next({code:400,status:"provided for parameter \"uuid_user\" is not a uuid"})
    next()
}

export const usernamecheck = (req,res,next) => {
    if(!isUUID(req.params.username)) next({code:400,status:"provided for parameter \"username\" is not a uuid"})
    next()
}

export const userbodycheck = (req,res,next) => {
    var errorflag = false

    if(!req.body.username) errorflag = true
    if(!req.body.password) errorflag = true
    if(!req.body.email) errorflag = true

    if(errorflag) next({code:400,status:"one or more of the given information empty if you do not use a field set it to null"})
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

export const blockeduuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_blocked)) next({code:400,status:"provided for parameter \"uuid_blocked\" is not a uuid"})
    next()
}