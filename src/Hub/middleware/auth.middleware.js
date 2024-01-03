import { isEmail } from "../utils/regex.util"
import dotenv from 'dotenv'
dotenv.config()

const encrypt = (str,seed = process.env.ENCRYPT_SEED) => {
    const cset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const l = 62
    var o = ""

    const s = process.env.ENCRYPTION_SALT_START + str + process.env.ENCRYPTION_SALT_END

    const st = (s.length - process.env.ENCRYPT_LEN) / 2
    const en = s.length - (s.length - process.env.ENCRYPT_LEN) / 2

    let h1 = 0x48c4df4e ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = st, ch; i < en; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }

    for(let i = st, ch; i < en; i++) {
        h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
        h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
        h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

        o += cset[Math.abs(h1 + h2) % l]
    }
    return o
}

export const encryptpassword = (req,res,next) => {
    if (!req.body.password) next({code:400,status:"no password given in body"})
    req.body.password = encrypt(req.body.password)
}

export const emailcheck = (req,res,next) => {
    if (!isEmail(req.body.email)) next({code:400,status:"given email failed the regex check, if you believe this is an error send a ticket to the github"})
    next()
}