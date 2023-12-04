const express = require('express')
const router = express.Router()
const articlesRouter = require('./articles.router')
const commentsRouter = require('./comments.router')
const editorsRouter = require('./editors.router')

router.get('/articles/', articlesRouter)
router.get('/comments/', commentsRouter)
router.get('/editors/', editorsRouter)