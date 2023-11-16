import { htmlError } from '../../errorhandler.utils.js'

export const useruuidcheck = (req,res,next) => {
    if (req.params?.uuid_user) next(htmlError(400,"uuid_user not found in parameters"))
    next()
}

export const frienduuidcheck = (req,res,next) => {
    if (req.params?.uuid_friend) next(htmlError(400,"uuid_friend not found in parameters"))
    next()
}

export const favoriteuuidcheck = (req,res,next) => {
    if (req.params?.uuid_favorite) next(htmlError(400,"uuid_favorite not found in parameters"))
    next()
}

export const gameuuidcheck = (req,res,next) => {
    if (req.params?.uuid_game) next(htmlError(400,"uuid_game not found in parameters"))
    next()
}

export const roomuuidcheck = (req,res,next) => {
    if (req.params?.uuid_room) next(htmlError(400,"uuid_rooms not found in parameters"))
    next()
}