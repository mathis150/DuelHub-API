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

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument))

//Export pour server.js