import { ObjectId } from "mongodb"
import { users } from "../src/database/mongo.js"
import { verifyJwtToken } from "../src/encrypt.js"

function sendError(res,status,message,err) {
  res.status(status).json({
    success:false,
    message:message,
    error:err
  })
}

//store user info for later use if the user provided auth token
//should be used by every post request except login and register
export function needLogin(req,res,next) {
  if(!req.headers.authorization) {
    res.status(401).send("you need to be logged in to do this action")
  }

  try {
    res.locals.user = verifyJwtToken(req.headers.authorization)
    next()
  } catch(err) {
    sendError(res,401,"authorization token is invalid or expired",err)
  }
}

//get the current user rank and store it
export function getUserRank(req,res,next) {
  users.findOne({_id:res.locals.user._id}).then((user) => {
    res.locals.user.rank = user.rank
    next()
  }).catch((err) => {
    sendError(res,500,"Error occured when trying to get logged in users rank",err)
  });
}
