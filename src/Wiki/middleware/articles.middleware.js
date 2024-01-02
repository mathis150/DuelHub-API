import { isUUID } from '../utils/uuid.utils.js';

export const checkUUID = (uuid) => {
    if(!isUUID(uuid)) next({code:400,status:"provided for parameter \"uuid\" is not a uuid"})
    next()
}