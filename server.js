import dotenv from "dotenv"
dotenv.config()

import { app } from "./app.js"
import * as authmiddleware from "./src/Hub/middleware/auth.middleware.js"
import * as userrouter from "./src/Hub/routers/user.router.js"
import * as gamerouter from "./src/Hub/routers/game.router.js"
import * as roomrouter from "./src/Hub/routers/room.router.js"
import * as messagerouter from "./src/Hub/routers/message.router.js"

const port = process.env.SERVERPORT || 3000

app.use("/user",userrouter) //public
app.use("/game",gamerouter) //public
app.use("/room",roomrouter) //private
app.use("/message",messagerouter) //private

app.use("/",(req,res) => {
    res.json({code:200,message:"connection successful"})
})

app.listen(port, () => {
    console.log(`port: ${port}\ntesturl: http://127.0.0.1:${port}/testconnection\nurl: http://127.0.0.1:${port}`)
})