//Imports required
import express from "express"
import cors from "cors"
import OpenApiValidator from "express-openapi-validator"
import swaggerUI from 'swagger-ui-express'
import YAML from "yamljs"

export const app = express()


//Fichier Swagger
const swaggerDocument = YAML.load('./open-api.yaml')

//Middlewares globaux
app.use(cors())
app.use(express.json())

//Middlewares OpenAPI
app.use(
    OpenApiValidator.middleware({
        apiSpec: './open-api.yaml',
        ignoreUndocumented: true
    })
)

app.get("/testconnection",(req,res) => {
    res.status(200).json({code:200,message:"successfully connected to database"})
})

app.use((err,req,res,next)=> {
    err.status = err.status || 500
    err.message = err.message || "no error message"
    res.status(err.status).json(err)
}) 


//Export pour server.js