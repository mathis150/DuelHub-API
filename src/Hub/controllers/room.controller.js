import * as service from '../services/room.service.js'
import { getuser, getuserdetails } from '../services/user.service.js'
import { getroomfeed, getuserfeed, removeallusermessageinroom } from '../services/message.service.js'

//? GET

export const getroominfo = async (req,res) => {
    res.json(await service.getroominfo(req.params.uuid_room))
}

export const getroominfodetails = async (req,res) => {
    res.json(await service.getroominfodetails(req.params.uuid_room))
}

export const getowner = async (req,res) => {
    res.json(await service.getroomrowner(req.params.uuid_room))
}

export const getownerdetails = async (req,res) => {
    const returnData = await service.getroomrowner(req.params.uuid_room)
    if (returnData.code === 200) {
        res.json(await getuserdetails(returnData.data[0].uuid))
    } else {
        res.json(returnData)
    }
}

export const getmessagefeed = async (req,res) => {
    res.json(await getroomfeed(req.params.uuid_room))
}

export const getmessagefeedwithoffset = async (req,res) => {
    res.json(await getroomfeed(req.params.uuid_room,req.params.offset))
}

export const getmessagefromuser = async (req,res) => {
    res.json(await getuserfeed(req.params.uuid_room,req.params.uuid_user))
}

export const getmessagefromuserwithoffset = async (req,res) => {
    res.json(await getuserfeed(req.params.uuid_room,req.params.uuid_user,req.params.offset))
}

export const addroom = async (req,res) => {
    res.json(await service.createroom(req.body.uuid_user,req.body.title))
}

export const renameroom = async (req,res) => {
    res.json(await service.changename(req.params.uuid_room,req.params.new_name))
}

export const adduser = async (req,res) => {
    res.json(await service.adduser(req.params.uuid_room,req.params.uuid_user))
}

export const deleteroom = async (req,res) => {
    res.json(await service.deleteroom(req.params.uuid_room))
}

export const removeuser = async (req,res) => {
    res.json(await service.removeuser(req.params.uuid_room,req.params.uuid_user))
}

export const removeuserandmessage = async (req,res) => {
    const returnData = await service.removeuser(req.params.uuid_room,req.params.uuid_user)
    if (returnData.code === 200) {
        res.json(await removeallusermessageinroom(req.params.uuid_room,req.params.uuid_user))
    } else {
        res.json(returnData)
    }
}