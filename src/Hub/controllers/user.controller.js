import * as service from '../services/user.service.js'

//? GET

export const getuser = (req,res) => {
    res.json(JSON.stringify(service.getuser(req.params.uuid_user)))
}

export const getuserdetails = (req,res) => {
    res.json(service.getuserdetails(req.params.uuid_user))
}

export const getuserfriendlist = (req,res) => {
    res.json(service.getuserfriendlist(req.params.uuid_user))
}

export const getuserfavoritelist = (req,res) => {
    res.json(service.getuserfavoritelist(req.params.uuid_user))   
}

export const getusergamelist = (req,res) => {
    res.json(service.getusergamelist(req.params.uuid_user)  )  
}

export const getuserroomlist = (req,res) => {
    res.json(service.getuserroomlist(req.params.uuid_user))
}

export const getuserbyusername = (req,res) => {
    res.json(service.getuserbyusername(req.params.username))
}


//? POST

export const addfavorite = (req,res) => {
    res.json(service.addfavorite(req.params.uuid_user,req.params.uuid_favorite))
}

export const addfriend = (req,res) => {
    res.json(service.addfriend(req.params.uuid_user,req.params.uuid_friend))
}

export const addgame = (req,res) => {
    res.json(service.addgame(req.params.uuid_user,req.params.uuid_game))
}

export const addroom = (req,res) => {
    res.json(service.addroom(req.params.uuid_user,req.params.uuid_room))
}

export const blockuser = (req,res) => {
    res.json(service.blockuser(req.params.uuid_user,req.params.uuid_blocked))
}

//? DELETE

export const deleteuser = (req,res) => {
    res.json(service.deleteuser(req.params.uuid_user))
}

export const removefavorite = (req,res) => {
    res.json(service.removefavorite(req.params.uuid_user,req.params.uuid_favorite))
}

export const removefriend = (req,res) => {
    res.json(service.removefriend(req.params.uuid_user,req.params.uuid_friend))
}

export const removegame = (req,res) => {
    res.json(service.removegame(req.params.uuid_user,req.params.uuid_game))
}

export const removeroom = (req,res) => {
    res.json(service.removeroom(req.params.uuid_user,req.params.uuid_room))
}

export const unblockuser = (req,res) => {
    res.json(service.unblockuser(req.params.uuid_user,req.params.uuid_blocked))
}