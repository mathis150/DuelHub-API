import express from "express"
import * as authMiddleware from '../middleware/auth.middleware.js'

import * as controller from '../controllers/auth.controller.js'

export const router = express.Router()

router.post("/login",authMiddleware.encryptpassword,authMiddleware.loginbodycheck,controller.login)

router.post("/register",authMiddleware.encryptpassword,authMiddleware.registrationbodycheck,controller.register)

router.post("/confirmation/:token",authMiddleware.tokencheck,controller.confirmuser)