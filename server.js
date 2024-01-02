import dotenv from "dotenv"
dotenv.config()

import { app } from "./app.js"
import { userrouter } from "./src/Hub/routers/user.router.js"

const host = process.env.SERVERHOST || localhost
const port = process.env.SERVERPORT || 3000

app.use("/user",userrouter)

app.use("/",(req,res) => {
    res.json({code:200,message:"connection successful"})
})

app.use((err,req,res,next) => {
    err.code = err.code || 500
    err.status = err.status || "no error message provided"
    res.json({code:err.code,status:err.status})
})

app.listen(port, () => {
    console.log(`port: ${port}\ntesturl: http://${host}:${port}/testconnection\nurl: http://127.0.0.1:${port}`)
})