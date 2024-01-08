import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { getuser, confirmuseremail } from './user.service.js'
import nodeMailer from 'nodemailer'
import { User } from '../models/user.model.js'

dotenv.config()

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
        request: null,
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
        request: null,
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
        request: null,
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
    })

    response.data.push(returnData)

    if (returnData.length == 0) {
        response.code = 400
        response.status = "error in given information (username, password and email is non nullable)"
        return response
    }

    return response
}

export const createjwttoken = (data) => {
    return jwt.sign({uuid:data.uuid,username:data.username || null},process.env.JWTSECRET,{expiresIn: "2d"})
}

export const validatejwttoken = async (token) => {
    const data = jwt.verify(token,process.env.JWTSECRET)

    await User.sync()

    var response = {
        code: 200,
        status: null,
        request: null,
        data: []
    }

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
        request: null,
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