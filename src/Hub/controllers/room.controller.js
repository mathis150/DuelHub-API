import * as service from '../services/room.service.js'
import { getuser, getuserdetails } from '../services/user.service.js'
import { getroomfeed, getuserfeed, removeallusermessageinroom } from '../services/message.service.js'

//? GET

export const getroominfo = (req,res) => {
    res.json(service.getroominfo(req.params.uuid_room))
}

export const getroominfodetails = (req,res) => {
    res.json(service.getroominfodetails(req.params.uuid_room))
}

export const getowner = (req,res) => {
    res.json(service.getroomrowner(req.params.uuid_room))
}

export const getownerdetails = (req,res) => {
    const returnData = service.getroomrowner(req.params.uuid_room)
    if (returnData.code === 200) {
        res.json(getuserdetails(returnData.data[0].uuid))
    } else {
        res.json(returnData)
    }
}

export const getmessagefeed = (req,res) => {
    res.json(getroomfeed(req.params.uuid_room))
}

export const getmessagefeedwithoffset = (req,res) => {
    res.json(getroomfeed(req.params.uuid_room,req.params.offset))
}

export const getmessagefromuser = (req,res) => {
    res.json(getuserfeed(req.params.uuid_room,req.params.uuid_user))
}

export const getmessagefromuserwithoffset = (req,res) => {
    res.json(getuserfeed(req.params.uuid_room,req.params.uuid_user,req.params.offset))
}

export const addroom = (req,res) => {
    res.json(service.createroom(req.body.uuid_user,req.body.title))
}

export const renameroom = (req,res) => {
    res.json(service.changename(req.params.uuid_room,req.params.new_name))
}

export const adduser = (req,res) => {
    res.json(service.adduser(req.params.uuid_room,req.params.uuid_user))
}

export const deleteroom = (req,res) => {
    res.json(service.deleteroom(req.params.uuid_room))
}

export const removeuser = (req,res) => {
    res.json(service.removeuser(req.params.uuid_room,req.params.uuid_user))
}

export const removeuserandmessage = (req,res) => {
    const returnData = service.removeuser(req.params.uuid_room,req.params.uuid_user)
    if (returnData.code === 200) {
        res.json(removeallusermessageinroom(req.params.uuid_room,req.params.uuid_user))
    } else {
        res.json(returnData)
    }
}