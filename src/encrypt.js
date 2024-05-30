import dotenv from "dotenv"
import jwt from 'jsonwebtoken'
dotenv.config()

const saltstart = process.env.ENCRYPTIONSALTSTART
const saltend = process.env.ENCRYPTIONSALTEND
const seed = process.env.ENCRYPTIONSEED
const jwtAuthToken = process.env.JWTAUTHKEY

if(!saltstart || !saltend || !seed || !jwtAuthToken) {
    throw Error("one of the encryption environment variable is not defined")
}

export const encrypt = (str,salt) => {
    str = saltstart + str + salt + saltend
    const strlenover2 = str.length / 2
    str = str.slice(strlenover2 - saltstart.length,strlenover2 + saltend.length)

    let out = ""

    let h1 = 0x1014dc41a ^ seed, h2 = 0x4c1e4f1c ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        for(let j = 0; j < str.length; j++) {
            h1 = Math.imul(h1 ^ str.charCodeAt(j), 1452178932);
            h2 = Math.imul(h2 ^ str.charCodeAt(j), 1247752314);
        }
        const code = (Math.abs(h1+h2)%52)
        const f = code >= 26
        const fcode = f ? code - 26 : code
        out += String.fromCharCode(f ? 97 + fcode : 65 + fcode)
    }

    return out;
}

export const makeJwtToken = (doc,expiration) => {
    return jwt.sign(doc,jwtAuthToken,{expiresIn: expiration})
}

export const verifyJwtToken = (token) => {
    return jwt.verify(token,jwtAuthToken)
}