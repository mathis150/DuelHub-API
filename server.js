import express from 'express'
import dotenv from 'dotenv'
import { rootRouter } from './api/hub.js'
import { wikiRouter } from './api/wiki.js'
import { forumRouter } from './api/forum.js'
import { authRouter } from './api/auth.js'

dotenv.config()

const app = express()

const port = process.env.EXTERNALPORT

const disableCors = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specified HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specified headers
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (if needed)
  next();
};

app.use(disableCors)

function sendError(res,status,message,err) {
  res.status(status).json({
    success:false,
    message:message,
    error:err
  })
}

function sanitizePath(path) {
  let pattern = /[^/]+\/\.\.\//;
  while (pattern.test(path)) {
      path = path.replace(pattern, '');
  }
  return path;
}


app.use("/",rootRouter)

app.use("/wiki",wikiRouter)

app.use("/forum",forumRouter)

app.use("/auth",authRouter)

app.listen(port,() => {
  console.log(`server started http://localhost:${port}/`)
})