import * as service from "../services/auth.service.js"
import dotenv from 'dotenv'


dotenv.config()

export const register = (req,res) => {
    var returnData

    returnData = service.registeruser(req.body.username,req.body.password,req.body.email)
    
    if(returnData.code != 200) {
        res.json(returnData)
    } else {
        var response = {
            code: 200,
            status: null,
            request: null,
            data: []
        }

        response.data.append(service.createjwttoken({uuid: returnData.data[0].uuid,username: returnData.data[0].username}))

        res.json(response)
    }
}

export const login = (req,res) => {
    var returnData

    if(!req.body.username) {
        returnData = res.json(service.loginemail(req.body.email,req.body.password))
    } else {
        returnData = res.json(service.loginusername(req.body.username,req.body.password))
    }

    if(returnData.code != 200) {
        if(!returnData.data[0].confirmed)

        res.json(returnData)
    } else {
        var response = {
            code: 200,
            status: null,
            request: null,
            data: []
        }

        response.data.append(service.createjwttoken({uuid: returnData.data[0].uuid,username: returnData.data[0].username}))

        res.json(response)
    }
}

export const confirmuser = (req,res) => {
    res.json(service.validateemail(req.params.token))
}