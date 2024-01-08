import { isUUID } from "../utils/regex.util.js"

export const gameuuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_game)) returnres.json({code:400,status:"provided for parameter \"uuid_game\" is not a uuid"})
    next()
}

export const gamebodycheck = (req,res,next) =>  {
    var errorflag = false

    if(!req.body.title) errorflag = true
    if(!req.body.series) errorflag = true
    if(!req.body.studio) errorflag = true
    if(!req.body.genre) errorflag = true
    if(!req.body.desc) errorflag = true
    if(!req.body.published) errorflag = true

    if(errorflag) return res.json({code:400,status:"one or more of the given information empty if you do not use a field set it to null"})
    next()
}

export const namegamecheck = (req,res,next) =>  {
    if(!req.params.name_game) return res.json({code:400,status:"name given for the query is invalid"})
    next()
}

export const namegenrecheck = (req,res,next) =>  {
    if(!req.params.name_genre) return res.json({code:400,status:"genre given for the query is invalid"})
    next()
}

export const namestudiocheck = (req,res,next) =>  {
    if(!req.params.name_studio) return res.json({code:400,status:"studio given for the query is invalid"})
    next()
}