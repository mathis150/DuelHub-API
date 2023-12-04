import { isUUID } from "../utils/uuid.utils"

export const gameuuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_game)) next({code:400,status:"provided for parameter \"uuid_game\" is not a uuid"})
    next()
}

export const gamebodycheck = (req,res,next) =>  {
    //TODO: implement check for a standardised game
}

export const namegamecheck = (req,res,next) =>  {
    //TODO: sanatize input
}

export const namegenrecheck = (req,res,next) =>  {
    //TODO: sanatize input
}

export const namestudiocheck = (req,res,next) =>  {
    //TODO: sanatize input
}