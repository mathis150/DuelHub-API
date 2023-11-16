const dotenv = require("dotenv").config()

const app = require('./app')

const port = process.env.SERVERPORT || 3000

app.listen(port, () => {
    console.log(`listening on port ${port} !`)
})