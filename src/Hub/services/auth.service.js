import jwt from 'jsonwebtoken'
import { getuser, confirmuseremail } from './user.service.js'
import nodeMailer from 'nodemailer'
import { User } from '../models/user.model.js'
import dotenv from 'dotenv'
dotenv.config()

const url = `https://${process.env.SERVERHOST}:${process.env.SERVERPORT}`

const transporter = nodeMailer.createTransport({
    host: 'soja.o2switch.net',
    port: 465,
    secure: true,
    auth: {
        user: 'noreply@dual-hub.mathis-lenoir.net',
        pass: 'rbY+RhYsHaZc'
    }
})

export const loginusername = async (username,password) => {
    await User.sync()

    var response = {
        code: 200,
        status: null,
        request: "login user with username and password",
        data: []
    }
    
    const returnData = await User.findAll({where: {username: username,password: password}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "could not login with the given information"
        return response
    }

    response.data.push(returnData[0])

    return response
}

export const loginemail = async (email,password) => {
    await User.sync()

    var response = {
        code: 200,
        status: null,
        request: "login user with email and password",
        data: []
    }

    const returnData = await User.findAll({where: {email: email,password: password}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "could not login with the given information"
        return response
    }

    response.data.push(returnData)

    return response
}

export const registeruser = async (username,password,email) => {
    await User.sync()

    var response = {
        code: 200,
        status: null,
        request: "register user with username, password and email",
        data: []
    }

    var returnData = await User.findAll({where: {username: username,email: email}})

    if (returnData.length != 0) {
        response.code = 400
        response.status = "the user already exist"
        return response
    }

    const user = {
        username: username,
        password: password,
        email: email,
        confirmed: false
    }

    var returnData = await User.create(user).then((user) => {
        return user
    }).then(function(result){
        return result
    }).catch(function(error){
        return error.original.code
    })

    response.data.push(returnData)

    if (returnData.length == 0) {
        response.code = 400
        response.status = "error in given information (username, password and email is non nullable)"
        return response
    } else if (returnData == "ER_DUP_ENTRY") {
        response.code = 400
        response.status = "the user is already a registed"
        return response
    }

    return response
}

export const createjwttoken = (data) => {
    try {
        return jwt.sign({uuid:data.uuid,username:data.username},process.env.JWTSECRET,{expiresIn: "2d"})
    } catch (err){
        return `error in creation of the jwt token contact an admin with the following error code: ${err}`
    }
}

export const validatejwttoken = async (token) => {
    var data;
    
    var response = {
        code: 200,
        status: null,
        request: "validate authetification token",
        data: []
    }

    try {
        data = jwt.verify(token,process.env.JWTSECRET)
    } catch (err){
        response.code = 400
        response.status = "authetification token invalid"
        return response
    }
    
    await User.sync()

    const returnData = await User.findAll({where: {uuid: data.uuid,username: data.username}})

    if (returnData.length == 0) {
        response.code = 400
        response.status = "no user linked to the given authentification token"
        return response
    }

    return response
}

export const validateemail = (token) => {
    const data = jwt.verify(token,process.env.JWTSECRET)

    var result = {
        code: 200,
        status: "successfully confirmed your email",
        request: "confirm user's email address",
    }

    var returnData = getuser(data.uuid)

    if(!returnData[0].uuid == data.uuid) {
        response.code = 400
        response.status = "confirmation token is invalid"
        return response
    }
    if(!returnData[0].email == data.email) {
        response.code = 400
        response.status = "confirmation token is invalid"
        return response
    }
    if(!data.secret == process.env.EMAILSECRET) {
        response.code = 400
        response.status = "confirmation token is invalid"
        return response
    }

    returnData = confirmuseremail(data.uuid)

    return result
}

export const sendconfirmationemail = (user) => {
    //TODO: REMOVE THE RETURN WHEN IN PROD
    return
    const confirmationData = {
        uuid : user.uuid,
        email : user.email,
        secret: process.env.EMAILSECRET
    }

    jwt.sign(
        confirmationData,
        process.env.JWTSECRET,
        {expiresIn: "1d"},
        (err,emailToken) => {
            const url = `https://${process.env.SERVERHOST}:${process.env.SERVERPORT}/auth/confirmation/${emailToken}`

            transporter.sendMail({
                to: user.email,
                subject: "Confirmation email: DuelHub",
                html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
            })

        })
}