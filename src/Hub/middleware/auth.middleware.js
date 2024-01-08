import dotenv from 'dotenv'
import * as service from '../services/auth.service.js'

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

export const validatejwttoken = async (req,res,next) => {    
    if(!req.headers.authorization) {
        return res.json({code:400,status:"missing authorization token"})
    }

    if((await service.validatejwttoken(req.headers.authorization,process.env.JWTSECRET)).code == 400) {
        return res.json({code:401,status:"invalid authorization headers"})
    }
    next()
}

export const registrationbodycheck = (req,res,next) => {
    var errorflag = false

    if(!req.body.username) errorflag = true
    if(!req.body.password) errorflag = true
    if(!req.body.email) errorflag = true

    if(errorflag) return res.json({code:400,status:"one or more of the given information empty if you do not use a field set it to null"})
    next()
}

export const loginbodycheck = (req,res,next) => {
    var passwordflag = false
    var authflag = 0

    if(!req.body.username) authflag += 1
    if(!req.body.email) authflag += 1
    if(!req.body.password) passwordflag = true

    if(authflag == 2) return res.json({code:400,status:"you must have at least an email or a username field"})

    if(passwordflag) return res.json({code:400,status:"password missing"})
    next()
}

export const encryptpassword = (req,res,next) => {
    if (!req.body.password) return res.json({code:400,status:"no password given in body"})
    req.body.password = encrypt(req.body.password)
    next()
}

export const emailcheck = (req,res,next) => {
    if (!req.body.email) return res.json({code:400,status:"no email given in body"})
    req.body.password = encrypt(req.body.password)
    next()
}

export const usernamecheck = (req,res,next) => {
    if (!req.body.username) return res.json({code:400,status:"no username given in body"})
    next()
}


export const tokencheck = (req,res,next) => {
    if (!req.body.token) return res.json({code:400,status:"no token given"})
    next()
}