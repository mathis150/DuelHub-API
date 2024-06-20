import express from 'express'
import { users } from '../src/database/mongo.js'
import { ObjectId } from 'mongodb'
import { encrypt, makeJwtToken } from '../src/encrypt.js'

export const authRouter = express.Router()

function sendError(res,status,message,err) {
  res.status(status).json({
    success:false,
    message:message,
    error:err
  })
}

//login the user and gives back a unique token for later use
authRouter.post("/login",(req,res) => {
  users.findOne({handle: req.body.handle}).then((user) => {
    if (user.password == encrypt(req.body.password,user.password_salt)) {
      res.status(200).send(makeJwtToken({_id: user._id,handle: user.handle,username: user.username,rank: user.rank},'1d'))
    } else {
      res.status(400).send("password or username is invalid")
    }
  }).catch((err) => {
    sendError(res,500,"Error occured when trying to login the user : " + req.body.handle,err)
  });
})

//check if a user is already using this handle
function checkHandle(req,res) {
  users.findOne({handle: req.body.handle}).then((result) => {
    if (!result) {
      next()
    } else {
      res.status(400).send("a user is already using this handle")
    }
  }).catch((err) => {
    sendError(res,500,"Error occured when trying to find if the handle : " + req.body.handle + "is used already",err)
  });
}

//check if password fits within guidelines
function isPasswordValid(password) {
  const MINLENGTH = 8;
  const MAXLENGTH = 64;

  // check if password meets size requirement
  if (password.length < MINLENGTH && password.length > MAXLENGTH) {
      return false;
  }

  // check if password has numbers
  if (!/\d/.test(password)) {
      return false;
  }

  return true;
}

//check if the password provided fits within guidelines
function checkPassword(req,res,next) {
  if(isPasswordValid(req.body.password)) {
    next()
  } else {
    res.status(400).send("password is invalid it should be of length 8 to 64 and have numbers")
  }
}

//register user and send a unique token for later use
authRouter.post("/register",checkHandle,checkPassword,(req,res) => {
  const usersalt = encrypt(handle + password + username,process.env.REGISTERSECRET)

  const doc = {
    handle : req.body.handle,
    username : req.body.username,
    password : encrypt(req.body.password,usersalt),
    password_salt : usersalt,
    email : req.body.email,
    verified : false,
    rank : rankEnum.user,
    pfp : null,
  }
}) 
