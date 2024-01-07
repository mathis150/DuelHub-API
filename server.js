import dotenv from "dotenv"
dotenv.config()

import { app } from "./app.js"
import * as authmiddleware from "./src/Hub/middleware/auth.middleware.js"
import * as userrouter from "./src/Hub/routers/user.router.js"
import * as gamerouter from "./src/Hub/routers/game.router.js"
import * as roomrouter from "./src/Hub/routers/room.router.js"
import * as messagerouter from "./src/Hub/routers/message.router.js"
import * as authrouter from "./src/Hub/routers/auth.router.js"

const host = process.env.SERVERHOST || localhost
const port = process.env.SERVERPORT || 3000

app.use("/user",userrouter.router) //public
app.use("/game",gamerouter.router) //public
app.use("/room",roomrouter.router) //private
app.use("/message",messagerouter.router) //private
app.use("/auth",authrouter.router)

// app.use("/",(req,res) => {
//     res.json({code:200,status:"Api is available"})
// })

app.listen(port, () => {
    console.log(`url: http://127.0.0.1:${port}`)
})