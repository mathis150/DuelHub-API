import { isUUID } from '../utils/uuid.utils.js';

export const checkArticleUUID = (req, res, next) => {
    if(!isUUID(req.params.uuid-article)) next({code:400,status:"provided for parameter \"uuid\" is not a uuid"})
    next()
}

export const checkEditorUUID = (req, res, next) => {
    if(!isUUID(req.params.uuid-editor)) next({code:400,status:"provided for parameter \"uuid\" is not a uuid"})
    next()
}

export const checkDeleteUUID = (req, res, next) => {
    if(!isUUID(req.params.uuid-article) && !isUUID(req.params.uuid-editor)) next({code:400,status:"provided for parameter \"uuid_article, uuid_author\" is not a uuid"})
    if(!isUUID(req.params.uuid-editor)) next({code:400,status:"provided for parameter \"uuid_article\" is not a uuid"})
    if(!isUUID(req.params.uuid-article)) next({code:400,status:"provided for parameter \"uuid_author\" is not a uuid"})
    next()
}