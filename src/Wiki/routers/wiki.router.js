const express = require('express')
const router = express.Router()
const articlesRouter = require('./articles.router')
const commentsRouter = require('./comments.router')

router.get('/articles/', articlesRouter)
router.get('/comments/', commentsRouter)