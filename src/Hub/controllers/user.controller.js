import * as service from '../services/user.service.js'

//? GET

export const getuser = async (req,res) => {
    res.json(await service.getuser(req.params.uuid_user))
}

export const getuserdetails = async (req,res) => {
    res.json(await service.getuserdetails(req.params.uuid_user))
}

export const getuserfriendlist = async (req,res) => {
    res.json(await service.getuserfriendlist(req.params.uuid_user))
}

export const getuserfavoritelist = async (req,res) => {
    res.json(await service.getuserfavoritelist(req.params.uuid_user))   
}

export const getusergamelist = async (req,res) => {
    res.json(await service.getusergamelist(req.params.uuid_user)  )  
}

export const getuserroomlist = async (req,res) => {
    res.json(await service.getuserroomlist(req.params.uuid_user))
}

export const getuserbyusername = async (req,res) => {
    res.json(await service.getuserbyusername(req.params.username))
}


//? POST

export const addfavorite = async (req,res) => {
    res.json(await service.addfavorite(req.params.uuid_user,req.params.uuid_favorite))
}

export const addfriend = async (req,res) => {
    res.json(await service.addfriend(req.params.uuid_user,req.params.uuid_friend))
}

export const addgame = async (req,res) => {
    res.json(await service.addgame(req.params.uuid_user,req.params.uuid_game))
}

export const addroom = async (req,res) => {
    res.json(await service.addroom(req.params.uuid_user,req.params.uuid_room))
}

export const blockuser = async (req,res) => {
    res.json(await service.blockuser(req.params.uuid_user,req.params.uuid_blocked))
}

//? DELETE

export const deleteuser = async (req,res) => {
    res.json(await service.deleteuser(req.params.uuid_user))
}

export const removefavorite = async (req,res) => {
    res.json(await service.removefavorite(req.params.uuid_user,req.params.uuid_favorite))
}

export const removefriend = async (req,res) => {
    res.json(await service.removefriend(req.params.uuid_user,req.params.uuid_friend))
}

export const removegame = async (req,res) => {
    res.json(await service.removegame(req.params.uuid_user,req.params.uuid_game))
}

export const removeroom = async (req,res) => {
    res.json(await service.removeroom(req.params.uuid_user,req.params.uuid_room))
}

export const unblockuser = async (req,res) => {
    res.json(await service.unblockuser(req.params.uuid_user,req.params.uuid_blocked))
}