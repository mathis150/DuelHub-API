import * as service from "../services/auth.service.js"

import dotenv from 'dotenv'


dotenv.config()

export const register = async (req,res) => {
    var returnData

    returnData = await service.registeruser(req.body.username,req.body.password,req.body.email)

    console.log(JSON.stringify(returnData))


    if(returnData.code != 200) {
        res.json(returnData)
    } else {
        var response = {
            code: 200,
            status: null,
            request: null,
            data: []
        }

        response.data.push(await service.createjwttoken({uuid: returnData.data[0].uuid,username: returnData.data[0].username}))

        res.json(response)
    }
}

export const login = async (req,res) => {
    var returnData

    if(!req.body.username) {
        console.log("with email")
        returnData = await service.loginemail(req.body.email,req.body.password)
    } else {
        console.log("with username")
        returnData = await service.loginusername(req.body.username,req.body.password)
    }

    if(returnData.code == 200) {
        var response = {
            code: 200,
            status: null,
            request: null,
            data: []
        }

        if(returnData.data[0].confirmed) {
            service.sendconfirmationemail(returnData.data[0])
            response.status = "please confirm the email sent to your authentification address and reconnect"
            res.json(response)
        } else {
            response.data.push(await service.createjwttoken({uuid: returnData.data[0].uuid,username: returnData.data[0].username}))

            res.json(response)
        }
    } else {
        res.json(returnData)
    }
}

export const confirmuser = async (req,res) => {
    res.json(await service.validateemail(req.params.token))
}