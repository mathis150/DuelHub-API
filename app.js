//Imports required
const express = require('express')
const app = express()
const cors = require('cors')
const OpenApiValidator = require('express-openapi-validator')
const swaggerUI = require('swagger-ui-express')
const YALM = require('yamljs')

//Fichier Swagger
const swaggerDocument = YALM.load('./open-api.yaml')

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

//Export pour server.js
module.exports = app