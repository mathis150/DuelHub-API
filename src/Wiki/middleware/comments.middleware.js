import { isUUID } from '../utils/uuid.utils.js';

export const checkArticlesCommentsUUID = (req,res,next) => {
    if(!isUUID(req.params.uuid-article)) next({code:400,status:"provided for parameter \"uuid\" is not a uuid"})
    next()
}

export const checkCommentUUID = (req,res,next) => {
    if(!isUUID(req.params.uuid-comment)) next({code:400,status:"provided for parameter \"uuid\" is not a uuid"})
    next()
}

export const checkPostCommentUUID = (req,res,next) => {
    if(!isUUID(req.body.uuid_article) && !isUUID(req.body.uuid_author)) next({code:400,status:"provided for parameter \"uuid_article, uuid_author\" is not a uuid"})
    if(!isUUID(req.body.uuid_article)) next({code:400,status:"provided for parameter \"uuid_article\" is not a uuid"})
    if(!isUUID(req.body.uuid_author)) next({code:400,status:"provided for parameter \"uuid_author\" is not a uuid"})
    next()
}

export const checkUpdateCommentUUID = (req,res,next) => {
    if(!isUUID(req.params.uuid-comment)) next({code:400,status:"provided for parameter \"uuid\" is not a uuid"})
    next()
}

export const checkDeleteCommentUUID = (req,res,next) => {
    if(!isUUID(req.params.uuid-comment)) next({code:400,status:"provided for parameter \"uuid\" is not a uuid"})
    next()
}