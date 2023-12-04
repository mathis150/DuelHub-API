import { isUUID } from "../utils/uuid.utils.js"

export const messageuuidcheck = (req,res,next) => {
    if(!isUUID(req.params.uuid_message)) next({code:400,status:"provided for parameter \"uuid_message\" is not a uuid"})
    next()
}

export const messagebodycheck = (req,res,next) =>  {
    //TODO: implement check for a standardised message
}